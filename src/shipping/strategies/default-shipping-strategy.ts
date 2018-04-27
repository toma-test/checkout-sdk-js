import { Address } from '../../address';
import { CheckoutSelectors, CheckoutStore } from '../../checkout';
import ConsignmentActionCreator from '../consignment-action-creator';

import ShippingStrategy from './shipping-strategy';

export default class DefaultShippingStrategy extends ShippingStrategy {
    constructor(
        store: CheckoutStore,
        private _consignmentActionCreator: ConsignmentActionCreator
    ) {
        super(store);
    }

    updateAddress(address: Address, options?: any): Promise<CheckoutSelectors> {
        return this._store.dispatch(
            this._consignmentActionCreator.updateAddress(address, options)
        );
    }

    selectOption(optionId: string, options?: any): Promise<CheckoutSelectors> {
        return this._store.dispatch(
            this._consignmentActionCreator.selectShippingOption(optionId, options)
        );
    }
}
