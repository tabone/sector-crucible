import { uuid } from "./utils";
import { Star } from "./Star";
import { Planet } from "./Planet";
import type { Sector } from "./Sector";
import type { SettlementVariant } from "./models";

import orbitalImage from "../assets/settlements/orbital.png";
import deepSpaceImage from "../assets/settlements/deep-space.png";
import planetsideImage from "../assets/settlements/planetside.png";

export type ComputeParent<TVariant extends SettlementVariant> =
  TVariant extends "PLANETSIDE"
    ? Planet
    : TVariant extends "ORBITAL"
      ? Star | Planet
      : TVariant extends "DEEP_SPACE"
        ? Star | Sector
        : unknown;

export type SettlementProps<TVariant extends SettlementVariant> = {
  id?: string;
  name: string;
  trouble: string;
  projects: string;
  variant: TVariant;
  authority: string;
  firstLook: string;
  population: string;
  initialContact: string;
  parent: ComputeParent<TVariant>;
};

export class Settlement<
  TVariant extends SettlementVariant = SettlementVariant,
> {
  private _name: SettlementProps<TVariant>["name"];
  private _parent: SettlementProps<TVariant>["parent"];
  private _variant: SettlementProps<TVariant>["variant"];
  private _trouble: SettlementProps<TVariant>["trouble"];
  private _projects: SettlementProps<TVariant>["projects"];
  private _authority: SettlementProps<TVariant>["authority"];
  private _firstLook: SettlementProps<TVariant>["firstLook"];
  private _population: SettlementProps<TVariant>["population"];
  private _id: Exclude<SettlementProps<TVariant>["id"], undefined>;
  private _initialContact: SettlementProps<TVariant>["initialContact"];

  constructor({
    id = uuid(),
    name,
    parent,
    variant,
    trouble,
    projects,
    authority,
    firstLook,
    population,
    initialContact,
  }: SettlementProps<TVariant>) {
    this._id = id;
    this._name = name;
    this._parent = parent;
    this._variant = variant;
    this._trouble = trouble;
    this._projects = projects;
    this._authority = authority;
    this._firstLook = firstLook;
    this._population = population;
    this._initialContact = initialContact;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get parentType() {
    return this._parent instanceof Planet
      ? "Planet"
      : this._parent instanceof Star
        ? "Star"
        : "Sector";
  }

  get parentName() {
    return this._parent instanceof Planet
      ? this._parent.name
      : this._parent.code;
  }

  get image() {
    switch (this._variant) {
      case "PLANETSIDE":
        return planetsideImage;
      case "ORBITAL":
        return orbitalImage;
      case "DEEP_SPACE":
        return deepSpaceImage;
      default:
        return undefined;
    }
  }

  get parent() {
    return this._parent;
  }

  get variant() {
    return this._variant;
  }

  get variantDescription() {
    switch (this._variant) {
      case "PLANETSIDE":
        return "Planetside";
      case "ORBITAL":
        return "Orbital";
      case "DEEP_SPACE":
        return "Deep Space";
      default:
        return "Unknown";
    }
  }

  get trouble() {
    return this._trouble;
  }

  get projects() {
    return this._projects;
  }

  get authority() {
    return this._authority;
  }

  get firstLook() {
    return this._firstLook;
  }

  get population() {
    return this._population;
  }

  get initialContact() {
    return this._initialContact;
  }
}
