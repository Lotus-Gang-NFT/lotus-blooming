import { Header } from 'common/Header'
import { StakePoolNotice } from 'components/StakePoolNotice'
import { useRewardDistributorData } from 'hooks/useRewardDistributorData'
import { useStakedTokenDatas } from 'hooks/useStakedTokenDatas'
import { useStakePoolData } from 'hooks/useStakePoolData'
import { useUserRegion } from 'hooks/useUserRegion'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'
import { StakedTokens } from '@/components/token-staking/staked-tokens/StakedTokens'
import { UnstakedTokens } from '@/components/token-staking/unstaked-tokens/UnstakedTokens'

function StakePoolHome(props: { stakePoolMetadataName: string | null }) {
  const router = useRouter()
  const { isFetched: stakePoolLoaded } = useStakePoolData()
  const userRegion = useUserRegion()
  const rewardDistributorData = useRewardDistributorData()
  const stakedTokenDatas = useStakedTokenDatas()
  const stakePoolDisplayName = props.stakePoolMetadataName
    ? props.stakePoolMetadataName.replace(' Staking', '') + ' Staking'
    : 'Cardinal NFT Staking'

  const { data: stakePoolMetadata } = useStakePoolMetadataCtx()

  if (
    !stakePoolLoaded ||
    (stakePoolMetadata?.disallowRegions?.length &&
      stakePoolMetadata?.disallowRegions.length > 0 &&
      !userRegion.isFetched)
  ) {
    return (
      <>
        <Head>
          <title>{stakePoolDisplayName}</title>
          <meta name="title" content={stakePoolDisplayName} />
          <meta
            name="description"
            content={
              props.stakePoolMetadataName
                ? 'Stake your ' +
                  props.stakePoolMetadataName.replace(' Staking', '') +
                  ' NFTs powered by Cardinal Staking'
                : 'Stake your Solana NFTs powered by Cardinal Staking'
            }
          />
          <meta name="image" content="https://stake.cardinal.so/preview.png" />
          <meta
            name="og:image"
            content="https://stake.cardinal.so/preview.png"
          />
          <link
            rel="icon"
            href={stakePoolMetadata?.imageUrl ?? `/favicon.ico`}
          />
        </Head>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{stakePoolDisplayName}</title>
        <meta name="title" content={stakePoolDisplayName} />
        <meta
          name="description"
          content={
            props.stakePoolMetadataName
              ? 'Stake your ' +
                props.stakePoolMetadataName.replace(' Staking', '') +
                ' NFTs powered by Cardinal Staking'
              : 'Stake your Solana NFTs powered by Cardinal Staking'
          }
        />
        <meta name="image" content="https://stake.cardinal.so/preview.png" />
        <meta name="og:image" content="https://stake.cardinal.so/preview.png" />
        <link rel="icon" href={stakePoolMetadata?.imageUrl ?? `/favicon.ico`} />
      </Head>
      <Header />
      <div className="relative z-0 mx-10 mt-4 mb-8 flex flex-col gap-4">
        <StakePoolNotice />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <UnstakedTokens />
          <StakedTokens />
        </div>
      </div>
    </>
  )
}

export default StakePoolHome
