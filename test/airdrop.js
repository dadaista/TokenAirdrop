var util = require ("./util.js");
var increaseTimeTo = util.increaseTimeTo;
var BigNumber      = util.BigNumber;

// some constants to manage amounts
const second     = 1;
const day        = 86400 * second;
const week       = day * 7;
const wei        = 1; //1 wei = 1 wei
const ether      = 1e18 * wei;

 

const MyToken = artifacts.require('./TokenImpl.sol');
const Airdrop     = artifacts.require('./Airdrop.sol');
contract('Airdrop', function ([owner, other]) {

    beforeEach(async function () {
    this.token      = await MyToken.new();
    console.log("token at:"+this.token.address);
    this.airdrop    = await Airdrop.new(this.token.address);
    console.log("airdrop at:"+this.airdrop.address);

    await this.token.transfer(this.airdrop.address, 3 * 10**18);
    console.log("**********");
  });


  it('should create airdrop with correct parameters', async function () {
    
    this.token.should.exist;
    this.airdrop.should.exist;
    (await this.token.balanceOf(this.airdrop.address)).should.be.bignumber.equal(3 * 10**18);


  });

   it('should do airdrop', async function () {
    
    var recipients = ["0x01","0x02","0x03"];
    var balances   = [10, 27, 314];
    await this.airdrop.doAirdrop(recipients, balances).should.be.fulfilled;
    (await this.airdrop.counter()).should.be.bignumber.equal(3);
    (await this.token.balanceOf(recipients[0])).should.be.bignumber.equal(balances[0]);
    (await this.token.balanceOf(recipients[1])).should.be.bignumber.equal(balances[1]);
    (await this.token.balanceOf(recipients[2])).should.be.bignumber.equal(balances[2]);


  });



  it('should reject the airdrop from other than owner', async function () {
    
    let addr     = ["0x0000000000000000000000000000000000000001",
                    "0x0000000000000000000000000000000000000002",
                    "0x0000000000000000000000000000000000000003"];
    let balances = [1000,2000,3000];
    await this.airdrop.doAirdrop(addr, balances, {from:other}).should.be.rejected;
  });




  it('should do massive airdrop to see gas issues', async function () {
    
    //an empty array
    var a = [];
    
    //generate 100 integers and push in a
    for (i=100;i<200;i++) a.push(i);

    //generate 100 0x addresses appending the integers
    const addr = a.map(x => "0x0000000000000000000000000000000000000" + x );

    console.log(addr);

    //generate an array of balances all equal to 1000
    let balances = addr.map(x => 1000);
    console.log(balances);    


    //call the airdrop to finally airdrop
    let result = await this.airdrop.doAirdrop(addr, balances);

    //write gas on the console
    console.log("gasUsed:"+result.receipt.gasUsed);

  });



  it('the airdrop should stop after 3 users', async function () {
    
    let addr     = ["0x0000000000000000000000000000000000000001",
                    "0x0000000000000000000000000000000000000002",
                    "0x0000000000000000000000000000000000000003",
                    "0x0000000000000000000000000000000000000004"];

    let balances = [1*ether,1*ether,1*ether,1*ether];



    await this.airdrop.doAirdrop(addr, balances).should.be.fulfilled;

    (await this.airdrop.counter()).should.be.bignumber.equal(3);

    let remainder = await this.token.balanceOf(this.airdrop.address);
    console.log(remainder+"");

  });

  it('the remainder should go back to owner', async function () {
    
    let addr     = ["0x0000000000000000000000000000000000000001"];

    let balances = [1e18];

    let ownerBalance = await this.token.balanceOf(owner);

    console.log("ownerBalance before airdrop: "+ownerBalance);

    await this.airdrop.doAirdrop(addr, balances).should.be.fulfilled;



    let remainder = await this.token.balanceOf(this.airdrop.address);
    console.log("remainder is" +remainder);

    await this.airdrop.getRemainder().should.be.fulfilled;

    (await this.token.balanceOf(owner)).should.be.bignumber.equal(remainder.add(ownerBalance));


  });

  it('the getRemainder() is rejected if not called from owner', async function () {
    let addr     = ["0x0000000000000000000000000000000000000001"];
    let balances = [1e18];
    await this.airdrop.doAirdrop(addr, balances).should.be.fulfilled;
    await this.airdrop.getRemainder({from:other}).should.be.rejected;

  });

});
