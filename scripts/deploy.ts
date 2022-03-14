import { ethers, run } from 'hardhat'

import { SimileNFT__factory, SimileToken__factory } from 'C:/BlockChainProject/polygon-tutorials/typechain'

async function main() {
  const [signer] = await ethers.getSigners()

  const simileToken = await new SimileToken__factory(signer).deploy()

  await simileToken.deployed()

  console.log('simileToken deployed to:', simileToken.address)

  const simileNFT = await new SimileNFT__factory(signer).deploy()

  await simileNFT.deployed()

  console.log('simileNFT deployed to:', simileToken.address)

  await simileNFT.safeMint(
    signer.address,
    'https://bafybeiak2bn6dcucitmpyhxce2oksyi66fw2f7iycy7b3zbj5dm7wb4nau.ipfs.infura-ipfs.io/'
  )

  await run('verify:verify', {
    address: simileToken.address,
    contract: 'contracts/SimileToken.sol:SimileToken'
  })

  await run('verify:verify', {
    address: simileNFT.address,
    contract: 'contracts/SimileNFT.sol:SimileNFT'
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})