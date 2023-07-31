const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Access Token", function () {
    let AccessToken;
    let aToken;
    let owner;
    let addr1;

    beforeEach(async function () {
        AccessToken = await ethers.getContractFactory("AccessToken");
        [owner, addr1] = await ethers.getSigners();

        aToken = await AccessToken.deploy();
    });

    describe("Mint", function () {
        it("Show the owner already holds a token", async function () {
            expect(await aToken.balanceOf(owner.address)).to.equal(1);
        });

        it("Mint a single token", async function () {
            const mintToken = await aToken.connect(addr1).mint();
            await mintToken.wait();

            expect(await aToken.balanceOf(addr1.address)).to.equal(1);
        });

        it("Should not allow multiple mints", async function () {
            const mintToken = await aToken.connect(addr1).mint();
            await mintToken.wait();
            
            await expect(aToken.connect(addr1).mint()).to.be.revertedWith('Limited to one token per address');
        });
    });

});
