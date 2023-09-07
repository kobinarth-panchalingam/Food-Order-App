# Food-Order-App

# Food Ordering and Splitwise Integration

## Description

This project is a web-based food ordering system with integrated Splitwise support. It allows users to place food orders, calculate the total cost, and seamlessly split the expenses with friends or colleagues using Splitwise. The system simplifies group food orders and expense management, making it ideal for office teams, friends, or any group of people ordering food together.

I've created this cool mobile web app as a side project, mainly for smartphones. It all started because my roommates and I often order food from a particular restaurant, and it was becoming a real pain to keep track of our orders.

We initially tried using a WhatsApp group, but it was messy and didn't work well. So, I decided to build this web app to make our lives easier. It's all about creating a smooth and hassle-free way to make food orders together.

With the app, we can easily make a list of what each of us wants to order. Once we've got our order together, we can quickly place it with services like PickMe. And the best part? The app also links up with Splitwise, automatically splitting the bill between us. It's a real time-saver!

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Project Status](#project-status)

## Prerequisites

Before you begin, make sure you have the following:

- **MongoDB Cloud Account:** You need to register for a MongoDB Cloud account and obtain your MongoDB connection URL.

- **Splitwise API Token:** Obtain your Splitwise API token by registering for Splitwise API access. You'll need the following Splitwise credentials:

  - `CONSUMER_KEY`
  - `CONSUMER_SECRET`
  - `ACCESS_TOKEN`

- **Splitwise Group ID:** Create a Splitwise group and obtain the group ID. Set it as `GROUP_ID` in your environment variables.

- **User Access:** Define the user ID of the person who has the main access to the system as `FROM`.

- **Environment Variables:** Create a `.env` file in the project directory and set the following variables:
  ```env
  MONGO_URL=YOUR_MONGODB_CONNECTION_URL
  CONSUMER_KEY=YOUR_SPLITWISE_CONSUMER_KEY
  CONSUMER_SECRET=YOUR_SPLITWISE_CONSUMER_SECRET
  ACCESS_TOKEN=YOUR_SPLITWISE_ACCESS_TOKEN
  API_KEY=
  GROUP_ID=YOUR_SPLITWISE_GROUP_ID
  FROM=YOUR_USER_ID
  ```

## Installation

1. To set up this project locally, follow these steps:
2. Clone the repository to your local machine.
3. Navigate to the project directory.
4. Run npm install to install the required dependencies.
5. Configure the environment variables in the .env file as described in the Prerequisites section.
6. Run npm start to launch the application locally.

## Usage

Once the project is set up, you can use it as described below:

1. Login: Start by logging into the system.
2. Food Menu: Browse the available food items and select the quantity you want to order.
3. Order Confirmation: After selecting items, click the "Submit" button to confirm your order.
4. Order Place: You will be asked to choose an order place (e.g., Esaki, University) when confirming your order.
5. Expense Split: The system will automatically split the expenses among the group members using Splitwise integration.
6. Past Orders: You can also view past orders in the "Past Orders" section.

## Contributing

We welcome contributions from the open-source community. If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test thoroughly.
4. Create a pull request with a clear description of your changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions, feedback, or support, please contact Kobinarth Panchalingam at kobinarth22@gmail.com.

## Project Status

This project is actively maintained and under continuous development. We appreciate your contributions and feedback to make it even better.
