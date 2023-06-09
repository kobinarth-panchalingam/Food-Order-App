const Splitwise = require("splitwise");
const sw = Splitwise({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  api_key: process.env.API_KEY,
});

const group_id = process.env.GROUP_ID;

async function createDebt(from, to, description, amount) {
  try {
    if (to != from) {
      const debt = await sw.createDebt({
        from: from,
        to: to,
        group_id: group_id,
        description: description,
        amount: amount,
      });
      return debt;
    }
    return;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create debt");
  }
}

async function fetchMemberEmails() {
  try {
    const group = await sw.getGroup({ id: group_id });
    const memberEmails = group.members.map((member) => ({ email: member.email, id: member.id }));
    return memberEmails;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch member emails");
  }
}

async function addNewUser(email) {
  try {
    // const result = await sw.addUserToGroup({ group_id: group_id, email: email });
    const result = await sw.getUser({ email: email });
    console.log(result);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  createDebt,
  fetchMemberEmails,
  addNewUser,
};
