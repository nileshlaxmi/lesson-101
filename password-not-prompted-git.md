### Why am I not prompted for password when pushing or pulling to my repositories in Bitbucket Cloud via HTTPS?
#### Problem

When you push or pull to a private repository over HTTPS, you are not prompted for a password.

#### Cause
The most likely reason for this is that Git has been configured to use a credential helper.

The configuration could have been made 
1. for all users in your system 
2. only for your user 
3. for a specific repository.

You can check which one of the 3 is the case by running these commands respectively:  
```
git config --system credential.helper
git config --global credential.helper
git config --local credential.helper
```

In case a credential helper is configured, you should see it listed in the output like below:
```
$ git config --system credential.helper
osxkeychain
```

#### Resolution
If you wish to be prompted for a password every time you push or pull to your remote repo, you can remove the credential helper from the configuration.

Depending on where the credential helper is configured, you can unset it using the respective command: 
```
git config --system --unset credential.helper
git config --global --unset credential.helper
git config --local --unset credential.helper
```