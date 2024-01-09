### Contributor Workflow:

#### 1. Clone the Repository:

```bash
git clone https://github.com/evanyfyip/vm-spinal-risk.git
cd vm-spinal-risk
```

#### 2. Create a New Branch:

Create a new branch with your initials and a brief description of the feature:

```bash
git checkout -b ey-new-feature-branch
```

#### 3. Make Changes:

Make necessary changes and additions to the code. Commit your changes:

```bash
git add .
git commit -m "Add new feature implemented by Evan Yip"
```

#### 4. Pull from Main:

Before pushing your changes, ensure your branch is up-to-date with the latest changes from the main branch:

```bash
git checkout main
git pull origin main
git checkout ey-new-feature-branch
git merge main
```

Resolve any merge conflicts if they occur.

#### 5. Push Changes:

Once conflicts are resolved, push your branch to the remote repository:

```bash
git push origin ey-new-feature-branch
```

#### 6. Create a Pull Request:

Create a pull request on the GitHub repository. Describe the changes you made and reference any relevant issues.

#### 7. Resolve Conflicts on Remote:

Resolve merge conflicts on Github

#### 8. Complete the Pull Request:

Once the pull request is reviewed and approved, it can be merged into the main branch.
