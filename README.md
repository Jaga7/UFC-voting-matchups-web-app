# UFC Voting Web App

## Matchups and voting
Fighters are grouped by weight categories. When voting for a matchup an optimistic update is done. Toasts are shown indicating done action:
![widok_vote_1](https://user-images.githubusercontent.com/75665204/230319816-c09910a9-2a09-4a29-89c4-6311e61df09f.jpg)
![widok_vote_2](https://user-images.githubusercontent.com/75665204/230319961-155ac4fd-f141-43b1-8c45-345c14c8d693.jpg)

## Top-voted matchups
![widok_home](https://user-images.githubusercontent.com/75665204/230319347-32bc72bb-afc0-4bb8-ab75-0bfecaf7b4c6.jpg)

## Light-mode dark-mode preference setting
The preference is saved to the user's profile in the database and applied at next login:
![widok_theme](https://user-images.githubusercontent.com/75665204/230320113-bffea133-ac76-4757-a667-ec77d3a9f1e7.jpg)

## Loading data, skeletons
As in SPA apps, there is data loading, and the way to deal with that from UX perspective implemented here, is using skeletons:
![widok_skeleton](https://user-images.githubusercontent.com/75665204/230320384-493761bb-493f-40ef-8f95-93e2fc961404.jpg)
Data loading is limited by query-results caching, if we go back to a subpage the data will be displayed immediately from cache

## Sign-in/register
![widok_register](https://user-images.githubusercontent.com/75665204/230319011-d4f6e2c3-9bb3-4507-9777-467f26ceb22c.jpg)
![widok_register_valid](https://user-images.githubusercontent.com/75665204/230318965-1ec4ab7d-eed1-40fb-bcb7-89b03fb44b88.jpg)
![widok_login_reject](https://user-images.githubusercontent.com/75665204/230319140-d0b3261d-daad-413b-b698-3624257a4c33.jpg)
![widok_login_toast](https://user-images.githubusercontent.com/75665204/230320229-43faf8ff-cfb2-4ffa-bd59-ae5dade8af3f.jpg)
