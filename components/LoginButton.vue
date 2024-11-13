<template>
  <div class="flex flex-col">
    <button @click="appKit.open()">Login</button>
    <div>isConnected: {{ isConnected ? 'true' : 'false' }}</div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {WagmiAdapter} from '@reown/appkit-adapter-wagmi'
import {
  arbitrum,
  base,
  mainnet,
  polygon,
  scroll,
  type AppKitNetwork,
} from '@reown/appkit/networks'
import {createAppKit, useAppKitAccount} from '@reown/appkit/vue'
import {useSiweConfig} from "~/components/useSiweConfig";
import {useReownConfig} from "~/components/useReownConfig";


const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, arbitrum, base, scroll, polygon]
const {projectId} = useReownConfig()
const siweConfig = useSiweConfig(networks)

const appKit = createAppKit({
  features: {
    socials: [],
    email: false,
  },
  adapters: [
    new WagmiAdapter({
      projectId: projectId.value,
      networks,
    }),
  ],
  networks: networks,
  projectId: projectId.value,
  siweConfig,
})

const account = useAppKitAccount()

const isConnected = computed(() => account.value.isConnected)
</script>
