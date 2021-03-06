const FundraiserContract = artifacts.require('Fundraiser');

contract('Fundraiser', (accounts) => {
  let fundraiser;
  const name = 'Beneficiary Name';
  const url = 'beneficiaryname.org';
  const imageURL = 'https://placekitten.com/600/350';
  const description = 'Beneficiary description';
  const beneficiary = accounts[1];
  const owner = accounts[0];

  beforeEach(async () => {
    fundraiser = await FundraiserContract.new(
      name,
      url,
      imageURL,
      description,
      beneficiary,
      owner
    );
  });

  describe('initilizer', () => {
    it('gets the beneficiary name', async () => {
      const actual = await fundraiser.name();
      assert.equal(actual, name, 'names should match');
    });

    it('gets the beneficiary url', async () => {
      const actual = await fundraiser.url();
      assert.equal(actual, url, 'url should match');
    });

    it('gets the beneficiary image url', async () => {
      const actual = await fundraiser.imageURL();
      assert.equal(actual, imageURL, 'imageURL should match');
    });

    it('gets the beneficiary description', async () => {
      const actual = await fundraiser.description();
      assert.equal(actual, description, 'description should match');
    });

    it('gets the beneficiary beneficiary', async () => {
      const actual = await fundraiser.beneficiary();
      assert.equal(actual, beneficiary, 'beneficiary should match');
    });

    it('gets the the owner', async () => {
      const actual = await fundraiser.owner();
      assert.equal(actual, owner, 'bios should match');
    });
  });

  describe('initilizer', () => {
    const newBeneficiary = accounts[2];

    it('update beneficiary when called by owner account', async () => {
      await fundraiser.setBeneficiary(newBeneficiary, { from: owner });
      const actualBeneficiary = await fundraiser.beneficiary();
      assert.equal(
        actualBeneficiary,
        newBeneficiary,
        'beneficiaries should match'
      );
    });

    it('thrown an error when called from a non-owner account', async () => {
      try {
        await fundraiser.setBeneficiary(newBeneficiary, { from: owner });
        const actualBeneficiary = await fundraiser.beneficiary();
        assert.equal(
          actualBeneficiary,
          newBeneficiary,
          'beneficiaries should match'
        );
      } catch (err) {
        const expectedError = 'Ownable: caller is not the owner';
        const acturalError = err.reason;
        assert.equal(acturalError, expectedError, 'should not be permitted');
      }
    });
  });
});
