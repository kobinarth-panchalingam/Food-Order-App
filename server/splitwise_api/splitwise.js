const Splitwise = require("splitwise");
const sw = Splitwise({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
});

const group_id = process.env.GROUP_ID;

async function createDebt(to, description, amount) {
  try {
    if (to !== process.env.FROM) {
      const debt = await sw.createDebt({
        from: process.env.FROM,
        to: to,
        group_id: group_id,
        description: description,
        amount: amount,
      });
      return debt;
    }
    return " ";
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create debt");
  }
}

async function fetchMemberEmails() {
  try {
    const group = await sw.getGroup({ id: group_id });
    // const memberEmails = group.members.map((member) => member.email);
    const memberEmails = group.members.map((member) => ({ email: member.email, id: member.id }));
    return memberEmails;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch member emails");
  }
}

module.exports = {
  createDebt,
  fetchMemberEmails,
};
