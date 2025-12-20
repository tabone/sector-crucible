import type { SettlementVariant } from "./models";
import { Settlement, type SettlementProps } from "./Settlement";

export type SettlementsManagerProps<TVariant extends SettlementVariant> = {
  parent: Settlement<TVariant>["parent"];
};

export class SettlementsManager<TVariant extends SettlementVariant> {
  private _parent: SettlementsManagerProps<TVariant>["parent"];
  private _settlements: Record<
    Settlement<TVariant>["id"],
    Settlement<TVariant>
  >;

  constructor({ parent }: SettlementsManagerProps<TVariant>) {
    this._parent = parent;
    this._settlements = {};
  }

  get parent() {
    return this._parent;
  }

  get settlements() {
    return Object.values(this._settlements);
  }

  createSettlement(props: Omit<SettlementProps<TVariant>, "parent">) {
    const settlement = new Settlement({ ...props, parent: this._parent });

    this._settlements[settlement.id] = settlement;

    return settlement;
  }

  removeSettlement(id: Settlement<TVariant>["id"]) {
    delete this._settlements[id];
  }
}
