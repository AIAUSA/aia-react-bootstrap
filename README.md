# AIA React Bootstrap

This project is based on the [CreateReact App](docs/react.md) and [this react firebase template](https://github.com/the-road-to-react-with-firebase/react-firebase-authentication)

## Getting Started

#### Quick Setup (details below)

1. Create Firebase Project
1. Create default login roles in Firebase
1. Secure Firebase Rules
1. Create Firebase Routes in App
1. Setup Roles in React
1. Setup Routes in React

### Setting Up Firebase

### Default Login Roles in React


### Firebase Database Rules (In Process)

```
{
  "rules": {
    ".read": false,
    ".write": false,
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid || root.child('users/'+auth.uid).child('roles').hasChildren(['ADMIN'])",
        ".write": "$uid === auth.uid || root.child('users/'+auth.uid).child('roles').hasChildren(['ADMIN'])"
      },
      ".read": "root.child('users/'+auth.uid).child('roles').hasChildren(['ADMIN'])",
      ".write": "root.child('users/'+auth.uid).child('roles').hasChildren(['ADMIN'])"
    },
    "messages": {
      ".indexOn": ["createdAt"],
      "$uid": {
        ".write": "data.exists() ? data.child('userId').val() === auth.uid : newData.child('userId').val() === auth.uid"
      },
      ".read": "auth != null",
      ".write": "auth != null",
    },
  }
}
```