export interface IUser {
  id: string;
  typ: string;
  type: string;
  thid: string;
  from: string;
  to: string;
  body: IBody;
}

export interface IBody {
  did_doc: IDidDoc;
  message: string;
  scope: any[];
}

export interface IDidDoc {
  "@context": string[];
  id: string;
  service: IService[];
}

export interface IService {
  id: string;
  type: string;
  serviceEndpoint: string;
  metadata: IMetadata;
}

export interface IMetadata {
  devices: IDevice[];
}

export interface IDevice {
  ciphertext: string;
  alg: string;
}
