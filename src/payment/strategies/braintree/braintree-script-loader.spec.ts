import { ScriptLoader } from '@bigcommerce/script-loader';

import { Braintree } from './braintree';
import BraintreeScriptLoader from './braintree-script-loader';
import { getClientMock, getDataCollectorMock, getModuleCreatorMock, getThreeDSecureMock } from './braintree.mocks';

describe('BraintreeScriptLoader', () => {
    let braintreeScriptLoader: BraintreeScriptLoader;
    let scriptLoader: ScriptLoader;
    let mockWindow: Braintree.HostWindow;

    beforeEach(() => {
        mockWindow = { braintree: {} } as Braintree.HostWindow;
        scriptLoader = {} as ScriptLoader;
        braintreeScriptLoader = new BraintreeScriptLoader(scriptLoader, mockWindow);
    });

    describe('#loadClient()', () => {
        let clientMock: Braintree.ClientCreator;

        beforeEach(() => {
            clientMock = getModuleCreatorMock(getClientMock());
            scriptLoader.loadScript = jest.fn(() => {
                mockWindow.braintree.client = clientMock;
                return Promise.resolve();
            });
        });

        it('loads the client', async () => {
            await braintreeScriptLoader.loadClient();
            expect(scriptLoader.loadScript).toHaveBeenCalledWith('//js.braintreegateway.com/web/3.15.0/js/client.min.js');
        });

        it('returns the client from the window', async () => {
            const client = await braintreeScriptLoader.loadClient();
            expect(client).toBe(clientMock);
        });
    });

    describe('#load3DS()', () => {
        let threeDSecureMock;

        beforeEach(() => {
            threeDSecureMock = getModuleCreatorMock(getThreeDSecureMock());
            scriptLoader.loadScript = jest.fn(() => {
                mockWindow.braintree.threeDSecure = threeDSecureMock;
                return Promise.resolve();
            });
        });

        it('loads the ThreeDSecure library', async () => {
            await braintreeScriptLoader.load3DS();
            expect(scriptLoader.loadScript).toHaveBeenCalledWith('//js.braintreegateway.com/web/3.15.0/js/three-d-secure.min.js');
        });

        it('returns the ThreeDSecure from the window', async () => {
            const threeDSecure = await braintreeScriptLoader.load3DS();
            expect(threeDSecure).toBe(threeDSecureMock);
        });
    });

    describe('#loadDataCollector()', () => {
        let dataCollectorMock;

        beforeEach(() => {
            dataCollectorMock = getModuleCreatorMock(getDataCollectorMock());
            scriptLoader.loadScript = jest.fn(() => {
                mockWindow.braintree.dataCollector = dataCollectorMock;
                return Promise.resolve();
            });
        });

        it('loads the data collector library', async () => {
            await braintreeScriptLoader.loadDataCollector();
            expect(scriptLoader.loadScript).toHaveBeenCalledWith('//js.braintreegateway.com/web/3.15.0/js/data-collector.min.js');
        });

        it('returns the data collector from the window', async () => {
            const dataCollector = await braintreeScriptLoader.loadDataCollector();
            expect(dataCollector).toBe(dataCollectorMock);
        });
    });
});