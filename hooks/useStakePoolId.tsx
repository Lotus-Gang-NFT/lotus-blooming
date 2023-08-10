import { tryPublicKey } from '@cardinal/common'
import { PublicKey } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'

export const useStakePoolId = () => {
  const stakePoolId = new PublicKey(
    '334PDyaV21GDBce8vDefgk1b6Yc1zvr4Xm1p1AjhLj5U'
  )
  const stakePoolMetadata = useStakePoolMetadataCtx()

  return useQuery(
    [
      'useStakePoolId',
      stakePoolId?.toString(),
      stakePoolMetadata.data?.stakePoolAddress.toString(),
    ],
    async () => {
      if (stakePoolMetadata.data)
        return new PublicKey(stakePoolMetadata.data.stakePoolAddress)
      return tryPublicKey(stakePoolId.toString()) ?? null
    }
  )
}
