import { RequestSender, Response } from '@bigcommerce/request-sender';

import { RequestOptions } from '../common/http-request';

import { Checkout } from '.';
import { CheckoutParams } from './checkout-params';

export default class CheckoutRequestSender {
    constructor(
        private _requestSender: RequestSender
    ) {}

    loadCheckout(id: string, { params: { include = [] } = {}, timeout }: RequestOptions<CheckoutParams> = {}): Promise<Response<Checkout>> {
        const url = `/api/storefront/checkout/${id}`;
        const defaultIncludes = ['customer'];

        return this._requestSender.get(url, {
            params: {
                include: defaultIncludes.concat(include).join(','),
            },
            timeout,
        });
    }
}
