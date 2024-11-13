import {createSIWEConfig, formatMessage, type SIWECreateMessageArgs} from '@reown/appkit-siwe'
import type {AppKitNetwork} from '@reown/appkit/dist/types/exports/networks'
import {generateNonce} from "siwe";

function verifyMessage(args: any, nonce: string) {
    return useFetch('/api/reown/verify', {
        method: 'POST',
        body: JSON.stringify({...args, nonce}),
    })
}

export function useSiweConfig(chains: [AppKitNetwork, ...AppKitNetwork[]]) {
    let session: any | null = null
    let nonce: string | null = null

    return createSIWEConfig({
        getMessageParams: async () => ({
            domain: window.location.host,
            uri: window.location.origin,
            chains: chains.map((chain: AppKitNetwork) => parseInt(chain.id.toString())),
            statement: 'Please sign with your account',
        }),
        createMessage: ({address, ...args}: SIWECreateMessageArgs) => formatMessage(args, address),

        getNonce: async () => (nonce = generateNonce()),
        getSession: () => session,
        verifyMessage: async (args: any) => {
            const response = await verifyMessage(args, nonce!)

            session = 'abc'
            return true
        },
        signOut: async () => false,
    })
}
