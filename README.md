# PYBS 
### Employee Management And Information System (Personel Yönetim Bilgi Sistemi)
*A project template for creating a command-line application that can run on .NET and Windows Linux and macOS with support for commands, dependency injection, logging, and a whole lot more.*<br/>
## Applications That You need to Run the project <br/>

1-Microsoft Visual Studio and Vsiual Studio Code <br/>
2-Docker <br/>
3-PgAdmin4 <br/>

# Stages <br/>

## 1-Download repository to your destkop <br/>
*1-Click on the code button and copy the reopsitory link* <br/>
*2-At visual studio click on "Clone Reapository" and  paste the link and download*
*You should add .next and node_module files in front-end with*`npm install next and node_module` <br/>
*You sould add nuget packages on project by going to `Project -> Manage Nuget Packages` *
*Essential packages that you need*
![packages](https://github.com/karakoseberkay/Pybs/blob/project-update-entitiy-to-dto/img/NugetPackages.png) <br/>
## 2- Download Docker and PgAdmin after connecting them <br/>
*1D- First of all, install Docker and postgresql apps and download.*
*2D- Run the DOCKER-WS file with VS code.* <br/>
*3D- Open Extension menu and write Docker on search bar, and download the Docker.* <br/>
![Docker-Ws](https://github.com/karakoseberkay/Pybs/blob/project-update-entitiy-to-dto/img/Docker-ws.png)
*4D- Open explorer in vs code and right click on docker.yml file and click the compose up button for create docker image. After these step, you can close the yml file.* <br/>
*5D- Finished for docker steps.* <br/>
<br/>
*1P- For create a Server, right click on servers button and select register row. Then click on server button.* <br/>
![CREATE SERVER](https://github.com/karakoseberkay/Pybs/blob/project-update-entitiy-to-dto/img/CreatingServer.png)
![Register](https://github.com/karakoseberkay/Pybs/blob/project-update-entitiy-to-dto/img/register-server.png)<br/>
*2P- You can choose any name for server. * <br/>
*3P- You should write localhost in Host name/address, in Connection.* <br/>
*4P- Port should be 5432 but if your pc has any accesible port, you can prefer these ports.* <br/>
*5P- Maintenance database, Username and Password should be postgres because write on the yml file.* <br/>
*6P- Click on Save button.` <br/>

*Final step- Write update-databse on Package manager consol in backend.* <br/>
*IF YOU CHANGE PORT OR SERVER SETTINGS, YOU SHOULD CHANGE THE PORT AND SERVER SETTİNGS AT DATACONTEXT.CS AND APPSETTİNGS.JSON İN BACKEND * <br/>
 <br/>
## 3- Change the settings in your front-end and back-end projects to connect Containers <br/>
*g*
## Migration And Postgresql <br/>
*⊛ After you change the settings on back-end and front-end and connecting them, you should create a new server on postgresql.*<br/>
*⊛ Then you should go to visual studio and click on view -> other windows -> Package manager console*<br/>
*⊛ Write *`PM> add-migration İnitialDatabase`* then run*<br/>
*⊛ İf its succeded you should write*`PM>Update-database`<br/>
*⊛ Yous should check on pg admin to see if tables added*<br/>

<br/>
### Check Our Linkedn Profiles To Contact Us: 

[Berkay Karaköse](http://www.linkedin.com/in/berkay-karak%C3%B6se-93527415b)   <br/>
[Furkan Onur Tozlu](http://www.linkedin.com/in/furkan-onur-tozlu-568915233)


