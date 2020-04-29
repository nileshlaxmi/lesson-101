# SSH Keys

## What are SSH Keys

SSH keys are essentially two files that each hold an encryption key in them – one public, one private. Only the private key can decrypt messages encrypted with the public key, and vice versa, ensuring only the holder of the key has access to the server. This type of encryption method is also called Public Key Cryptography or Asymmetric Cryptography. With the added benefit of setting a passphrase for the private key (that encrypts it’s content on disk, so no one can see or use it even if they get a hold of it), SSH keys are much safer than password authentication in most use-cases.

## Generating SSH Keys with SSH-KEYGEN

Fire up your shell, and type in ssh-keygen:

![alt text](https://blog.vpscheap.net/wp-content/uploads/2018/06/ssh_keygen.png "SSH Keygen")

## Benefits of SSH Keys

Using SSH keys is only one option for making sure only authorized persons have access to the server, and has many added benefits besides that. Having password authentication disabled on the server renders botnet brute-force attacks virtually useless, as they’ll never have the chance to try to log in as they don’t have the private key. Likewise, the private key and it’s passphrase never get sent over the network, as opposed to a password which the server has to authenticate, so there’s practically no possibility of a man-in-the-middle attack. That’s not to say they’re completely secure – if your local machine and passphrase get compromised, one could gain unauthorized access.

They can also be used in automation scripts to automatically connect to servers, and management of multiple keys is made easy by various keyring applications. Though not suitable for every use-case, SSH keys are a great choice for having that extra layer of security without much hassle.

## How to set up for Git

```bash
Check to see if you have any existing SSH keys:
ls -al ~/.ssh

Generating a new SSH key:
Open Git Bash.

Paste the text below, substituting in your GitHub Enterprise email address.

$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
This creates a new ssh key, using the provided email as a label.

> Generating public/private rsa key pair.
When you're prompted to "Enter a file in which to save the key," press Enter. This accepts the default file location.

> Enter a file in which to save the key (/c/Users/you/.ssh/id_rsa):[Press enter]
At the prompt, type a secure passphrase. For more information, see "Working with SSH key passphrases".

> Enter passphrase (empty for no passphrase): [Type a passphrase]
> Enter same passphrase again: [Type passphrase again]

Adding your SSH key to the ssh-agent:
eval $(ssh-agent -s)

Adding a new SSH key to your GitHub account:
Copy the SSH key to your clipboard.
clip < ~/.ssh/id_rsa.pub
```

In the upper-right corner of any page, click your profile photo, then click Settings.

![alt text](https://github-images.s3.amazonaws.com/enterprise/2.16/assets/images/help/settings/userbar-account-settings.png "Settings")

In the user settings sidebar, click SSH and GPG keys.

![alt text](https://github-images.s3.amazonaws.com/enterprise/2.16/assets/images/help/settings/settings-sidebar-ssh-keys.png "SSH")

Click New SSH key or Add SSH key.

![alt text](https://github-images.s3.amazonaws.com/enterprise/2.16/assets/images/help/settings/ssh-add-ssh-key.png "New SSH")

In the "Title" field, add a descriptive label for the new key. For example, if you're using a personal Mac, you might call this key "Personal MacBook Air".

Paste your key into the "Key" field.

![alt text](https://github-images.s3.amazonaws.com/enterprise/2.16/assets/images/help/settings/ssh-key-paste.png "Paste Key")

Click Add SSH key.

![alt text](https://github-images.s3.amazonaws.com/enterprise/2.16/assets/images/help/settings/ssh-add-key.png "Add SSH Key")

If prompted, confirm your GitHub Enterprise password.

![alt text](https://github-images.s3.amazonaws.com/enterprise/2.16/assets/images/help/settings/sudo_mode_popup.png "Confirm Password")
