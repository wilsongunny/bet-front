import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

export const injected = new InjectedConnector({
    supportedChainIds: [56]
});

export const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
    appName: 'Betting site',
    supportedChainIds: [56]
});

export const WalletConnect = new WalletConnectConnector({
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    supportedChainIds: [56]
});

export const switchNetwork = async (status: boolean = false, isM: boolean = false) => {
    try {
        const provider = window as any;
        if (provider.ethereum) {
            const chainId = await provider.ethereum.request({ method: 'eth_chainId' });
            const ChainId = '0x38';
            if (chainId === ChainId) return;
            try {
                await provider.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: ChainId }]
                });
            } catch (switchError: any) {
                console.log(switchError);
            }
        } else if (!status && isM) {
            window.open('https://metamask.io/download/');
        }
    } catch (error) {
        console.log(error);
    }
};
