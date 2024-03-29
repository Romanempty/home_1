import { Request } from "express";

export type RequestWithParams <P> = Request <P, {}, {}, {}>;
export type RequestWithBody <B> = Request <{}, {}, B, {}>;
export type RequestWithBodyAndParams <P, B> = Request <P, {}, B, {}>;
export type RequestWithQueryParams <Q> = Request <{},{},{}, Q>;
export type RequestWithParamsAnqQuery <P,Q> = Request <P, {}, {}, Q>;