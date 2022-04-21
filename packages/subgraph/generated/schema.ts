// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Campaign extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Campaign entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Campaign entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Campaign", id.toString(), this);
    }
  }

  static load(id: string): Campaign | null {
    return changetype<Campaign | null>(store.get("Campaign", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): Bytes | null {
    let value = this.get("owner");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set owner(value: Bytes | null) {
    if (!value) {
      this.unset("owner");
    } else {
      this.set("owner", Value.fromBytes(<Bytes>value));
    }
  }

  get strategyHash(): Bytes | null {
    let value = this.get("strategyHash");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set strategyHash(value: Bytes | null) {
    if (!value) {
      this.unset("strategyHash");
    } else {
      this.set("strategyHash", Value.fromBytes(<Bytes>value));
    }
  }

  get merkleRoot(): Bytes | null {
    let value = this.get("merkleRoot");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set merkleRoot(value: Bytes | null) {
    if (!value) {
      this.unset("merkleRoot");
    } else {
      this.set("merkleRoot", Value.fromBytes(<Bytes>value));
    }
  }

  get totalSupply(): BigInt | null {
    let value = this.get("totalSupply");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set totalSupply(value: BigInt | null) {
    if (!value) {
      this.unset("totalSupply");
    } else {
      this.set("totalSupply", Value.fromBigInt(<BigInt>value));
    }
  }

  get assetAddress(): Bytes | null {
    let value = this.get("assetAddress");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set assetAddress(value: Bytes | null) {
    if (!value) {
      this.unset("assetAddress");
    } else {
      this.set("assetAddress", Value.fromBytes(<Bytes>value));
    }
  }
}
