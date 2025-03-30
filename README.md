1.  Clone the project - nothing much after that.
2.  Install all the node modules - if needed delete the existing nodes module folder and re-install
3.  Change axiosConfig - > baseURL to local
4.  YML -
5.  CI triggers only when the changes are commited to the main branch (typically when a PR is completed)
6.  Set the environment too MONGO_URI
7.  Set up the approriate node version
8.  set these params.
    MONGO_URI: ${{ secrets.MONGO_URI }}
    JWT_SECRET: ${{ secrets.JWT_SECRET }}
    PORT: ${{ secrets.PORT }}
9.  Stop pm2 runnings apps
10. Install all the dependencies in the backend
11. Install all the dependencies in the frontend
12. Run the backend tests that are implemented in the tests folder.
13. Run the CD section
14. Run/start the PM2 back on.
15. Restart PM2
