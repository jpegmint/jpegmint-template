// Load dependencies
const { expect } = require("chai");
const { ethers } = require("hardhat");

const { shouldBehaveLikeERC721 } = require('./behaviors/ERC721.behavior');
const { shouldBehaveLikeOwnable } = require('./behaviors/Ownable.behavior');
const { shouldBehaveLikeERC721Metadata } = require('./behaviors/ERC721Metadata.behavior');

describe('ERC721Artist', () => {

    const CONTRACT_NAME = 'NftContract';
    const TOKEN_NAME = 'NftContract';
    const TOKEN_SYMBOL = 'NFT';

    let factory, contract;
    let accounts, owner, newOwner, approved, operator, other;

    beforeEach(async () => {
        factory = await ethers.getContractFactory(CONTRACT_NAME);
        contract = await factory.deploy();
        await contract.deployed();
        
        accounts = await ethers.getSigners();
        [ owner, newOwner, approved, operator, other ] = accounts;
    });

    describe('Ownable', () => {
        shouldBehaveLikeOwnable(() => [ contract, accounts ]);
    });

    describe('ERC721Metadata', () => {
        shouldBehaveLikeERC721Metadata(() => [ contract, accounts ], TOKEN_NAME, TOKEN_SYMBOL);
    });

    describe('ERC721', () => {

        beforeEach(async () => {
            await contract.mint(owner.address, 1);
            await contract.mint(owner.address, 2);
        });

        shouldBehaveLikeERC721(() => [ contract, accounts, 1, 2, 100 ]);
    });
});
