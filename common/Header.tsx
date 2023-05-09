import { AccountConnect } from '@cardinal/namespaces-components'
import { getLuminance } from '@mui/material'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { GlyphWallet } from 'assets/GlyphWallet'
import { useStakePoolId } from 'hooks/useStakePoolId'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'

import { Airdrop } from './Airdrop'
import { ButtonSmall } from './ButtonSmall'
import { asWallet } from './Wallets'

export const Header = () => {
  const { environment, secondaryConnection } = useEnvironmentCtx()
  const wallet = useWallet()
  const walletModal = useWalletModal()
  const { data: stakePoolId } = useStakePoolId()
  const { data: stakePoolMetadata } = useStakePoolMetadataCtx()

  return (
    <div>
      <div className="mb-5 flex flex-wrap justify-center gap-6 px-10 pt-5 text-white md:justify-between">
        <div className="flex items-center gap-3">
          <h1>Lotus Blooming</h1>
        </div>
        <div className="relative my-auto flex flex-wrap items-center justify-center gap-y-6 align-middle">
          <div className="mr-10 flex flex-wrap items-center justify-center gap-8">
            {stakePoolId &&
              stakePoolMetadata &&
              stakePoolMetadata.links?.map((link) => (
                <a
                  key={link.value}
                  href={link.value}
                  className="cursor-pointer transition-all hover:opacity-80"
                >
                  <p style={{ color: stakePoolMetadata?.colors?.fontColor }}>
                    {link.text}
                  </p>
                </a>
              ))}
          </div>
          {wallet.connected && wallet.publicKey ? (
            <AccountConnect
              dark={
                stakePoolMetadata?.colors?.primary
                  ? getLuminance(stakePoolMetadata?.colors?.primary) < 0.5
                  : true
              }
              connection={secondaryConnection}
              environment={environment.label}
              handleDisconnect={() => wallet.disconnect()}
              wallet={asWallet(wallet)}
            />
          ) : (
            <ButtonSmall
              className="text-xs"
              onClick={() => walletModal.setVisible(true)}
            >
              <>
                <GlyphWallet />
                <div className="text-white">Connect wallet</div>
              </>
            </ButtonSmall>
          )}
        </div>
      </div>
    </div>
  )
}
