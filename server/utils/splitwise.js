const Splitwise = require("splitwise");
const sw = Splitwise({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
});

const group_id = process.env.GROUP_ID;

const createDebt = async (shares, description, amount) => {
    try {
        await sw.createExpense({
            group_id: group_id,
            description: description,
            cost: amount,
            users: shares,
        });

        return;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create debt");
    }
}

const fetchMemberEmails = async () => {
    try {
        const group = await sw.getGroup({ id: group_id });
        const memberEmails = group.members.map((member) => ({ email: member.email, id: member.id }));
        return memberEmails;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch member emails");
    }
}

const addNewUser = async (email) => {
    try {
        // const result = await sw.addUserToGroup({ group_id: group_id, email: email });
        const result = await sw.getUser({ email: email });
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
