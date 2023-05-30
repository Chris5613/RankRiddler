# RankRiddler

[![CodeFactor](https://www.codefactor.io/repository/github/chris5613/rankriddler/badge)](https://www.codefactor.io/repository/github/chris5613/rankriddler)
[![GitHub license](https://img.shields.io/github/license/Chris5613/RankRiddler)](https://github.com/Chris5613/RankRiddler/blob/main/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/Chris5613/RankRiddler)](https://github.com/Chris5613/RankRiddler/graphs/contributors)
[![GitHub stars](https://img.shields.io/github/stars/Chris5613/RankRiddler)](https://github.com/Chris5613/RankRiddler/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Chris5613/RankRiddler)](https://github.com/Chris5613/RankRiddler/network/members)
[![GitHub issues](https://img.shields.io/github/issues/Chris5613/RankRiddler)](https://github.com/Chris5613/RankRiddler/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/Chris5613/RankRiddler)](https://github.com/Chris5613/RankRiddler/pulls)

RankRiddler is a fun and engaging game where players are presented with clips of gameplay and must use their knowledge and experience to accurately guess the rank of the player in the video. Whether you are a seasoned veteran of the game or just starting out, RankRiddler provides a fun and interactive way to test your knowledge of the game. RankRiddler has a point system that rewards correct answers and a leaderboard system to track the top players. Do you have the knowledge to be on top?

## Table of Contents

- RankRiddler
  - [Table of Contents](#table-of-contents)
  - [About The Project](#about-the-project)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Contributing](#contributing)
  - [License](#license)

## About The Project!

![7c849c0003b40aa2ce72cdc05a6b7888](https://github.com/Chris5613/RankRiddler/assets/24240227/cda300e6-734e-4282-9b21-52fc9f1b4529)
![6f4f1840d8dbd881e85f566a380109ff](https://github.com/Chris5613/RankRiddler/assets/24240227/866a6bcb-fa70-475c-aefa-7a8e633d5560)
![7ef48457e20dc3324d9aabcec97ed185](https://github.com/Chris5613/RankRiddler/assets/24240227/90ac6cca-c746-4a28-842b-73bce7ac1812)


Players are not required to create an account but can set their username. Once they have chosen a game, they can watch a clip and determine the rank of the player in the video. Depending on their answer, players can gain or lose points and track their progress on the leaderboard, which displays the top 10 players.

### Prerequisites

1. Node
2. Git

## Contributing

Any user who would like to contribute can fork the repo and submit a issue first explaining what you want to change. After approval, you can submit a pull request

## Installation

Follow the instructions below to set up the project on your local machine:

1. **Fork the repo:** Fork the project repository by clicking on the Fork button in the upper right corner of the repository page.

2. **Clone the repo to your local machine:** Copy the URL of the forked repository and run the following command in your terminal:
   ```
   git clone <forked_repository_url>
   ```
3. **Navigate to the Front-End directory:** Run the following command in your terminal:
   ```
   cd Front-End
   ```
4. **Install dependencies:** Run the following command in your terminal to install the necessary dependencies:
   ```
   npm install
   ```
5. **Start the application:** Run the following command in your terminal to start the Front-End:
   ```
   npm start
   ```
6. **Open a new terminal:** Open a new terminal and navigate to the Back-End directory by running the following command:
   ```
   cd Back-End
   ```
7. **Install dependencies:** Run the following command in your terminal to install the necessary dependencies:
   ```
   npm install
   ```
8. **Create a .env file:** Create a .env file in the root of the Back-End folder.
9. **Add MongoDB URI to .env file:** Add MONGO=yourMongoDBURI to the .env file.
10. **Add port number to .env file:** Add PORT=portNumber to the .env file, where portNumber is the port number you want to use.
11. **Start the application:** Run the following command in your terminal to start the Back-End:
    ```
    npm run dev
    ```

## License

RankRiddler is licensed under the MIT license. See [LICENSE](/LICENSE) for more information.
