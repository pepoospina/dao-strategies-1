import { Button, DatePicker, Form, Input, Select } from 'antd';

// import { transactor } from 'eth-components/functions';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber, ethers } from 'ethers';
import { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ORACLE_NODE_URL } from '~~/config/appConfig';

import { useAppContracts } from '~~/config/contractContext';
import { CampaignCreatedEvent } from '~~/generated/typechain/CampaignFactory';

const RANDOM_BYTES32 = '0x5fd924625f6ab16a19cc9807c7c506ae1813490e4ba675f843d5a10e0baacdb8';

export interface ICampaignCreateProps {
  dum?: any;
}

const { Option } = Select;

export const CampaignCreate: FC<ICampaignCreateProps> = () => {
  const ethersContext = useEthersContext();
  const [campaignType, setCampaignType] = useState();

  const campaignFactoryContract = useAppContracts('CampaignFactory', ethersContext.chainId);
  const history = useHistory();

  const createCampaign = async (): Promise<void> => {
    /* look how you call setPurpose on your contract: */
    /* notice how you pass a call back for tx updates too */

    const account = ethersContext.account;
    if (account === undefined) throw new Error('account undefined');
    const salt = ethers.utils.keccak256(ethers.utils.hashMessage(account + Date.now().toString()));

    // const tx = transactor(ethComponentsSettings, ethersContext?.signer);
    // if (tx === undefined) throw new Error('tx undefined');

    if (campaignFactoryContract === undefined) throw new Error('campaignFactoryContract undefined');
    if (ethersContext === undefined) throw new Error('ethersContext undefined');
    if (ethersContext.account === undefined) throw new Error('ethersContext.account undefined');

    const ex = await campaignFactoryContract.createCampaign(
      { sharesMerkleRoot: RANDOM_BYTES32, totalShares: BigNumber.from(0) },
      RANDOM_BYTES32,
      account,
      account,
      true,
      ethers.BigNumber.from(1000),
      salt
    );
    const txReceipt = await ex.wait();

    if (txReceipt.events === undefined) throw new Error('txReceipt.events undefined');
    const event = txReceipt.events.find((e) => e.event === 'CampaignCreated') as CampaignCreatedEvent;

    if (event === undefined) throw new Error('event undefined');
    if (event.args === undefined) throw new Error('event.args undefined');

    const campaignAddress = event.args.newCampaign;

    history.push(`/campaign/${campaignAddress}`);
  };

  const [form] = Form.useForm();

  const initialValues = { campaignType: 'github', repository: '' };

  const onCampaignTypeSelected = (value: string): void => {
    form.setFieldsValue({ campaignType: value });
  };

  const onFinish = async (values: any): Promise<void> => {
    await fetch(ORACLE_NODE_URL + '/campaign/simulate', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ values }),
    });
  };

  const onReset = (): void => {
    form.resetFields();
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <>
      <Link to="/">Back</Link>
      <br></br>
      <br></br>
      <Form {...layout} initialValues={initialValues} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="campaignType" label="Type" rules={[{ required: true }]}>
          <Select onChange={onCampaignTypeSelected} allowClear>
            <Option value="github">Github</Option>
            <Option value="twitter">Twitter (coming soon)</Option>
          </Select>
        </Form.Item>
        <Form.Item name="repository" label="Repository" rules={[{ required: true }]}>
          <Input></Input>
        </Form.Item>
        <Form.Item name="fromDate" label="Start counting on">
          <DatePicker />
        </Form.Item>
        <Form.Item name="toDate" label="Count up until">
          <DatePicker />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
