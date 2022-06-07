import { ClientAPI } from '@duna/client';
import { OrderResponse } from '..';
import { User } from '../services/auth';
import { Merchant } from '../services/merchant';

export default interface State {
  client: ClientAPI;
  user?: User;
  merchant?: Merchant;
  order: OrderResponse;
}

export interface StateJson extends Omit<State, 'client'> {
  client: {
    baseURL: string;
    headers: Record<string, string>;
    token: string;
  };
}
