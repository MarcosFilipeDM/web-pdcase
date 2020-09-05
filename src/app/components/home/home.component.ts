import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserRegisterComponent } from '../modals/user-register/user-register.component';
import { CheckPasswordComponent } from '../modals/check-password/check-password.component';
import { ConfirmActionComponent } from '../modals/confirm-action/confirm-action.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  columns = ['options', 'username', 'name', 'surname', 'email', 'phone', 'registerDate']
  dataTable = new MatTableDataSource<User>();

  constructor(
    public userService: UserService,
    public dialog: MatDialog,
    private msgService: ToastrService,
  ) { }

  ngOnInit() {
    this.readAllUsers();
  }

  readAllUsers(){
    this.blockUI.start()
    this.userService.readAllUsers().subscribe(
      res => {
        this.dataTable = new MatTableDataSource<User>(res)
        this.blockUI.stop()
      }, error => {
        this.msgService.error('Verifique se o servidor esta ativo!', 'Erro')
        this.blockUI.stop()
      }
    )
  }

  createUser(user: User){
    this.blockUI.start()
    this.userService.createUser(user).subscribe(
      res => {
        this.msgService.success('Usuário cadastrado.')
        this.readAllUsers();
        this.blockUI.stop();
      }, error => {
        this.msgService.error('Erro ao criar usuário.')
        this.blockUI.stop()
      }
    )
  }

  updateUser(user: User){
    this.blockUI.start()
    this.userService.updateUser(user).subscribe(
      res => {
        this.msgService.success('Usuário atualizado.')
        this.readAllUsers();
        this.blockUI.stop();
      }, error => {
        this.msgService.error('Erro ao atualizar usuário.')
        this.blockUI.stop()
      }
    )
  }

  getUser(userId:number){
    let dialogRef = this.dialog.open(CheckPasswordComponent,{
      width: '400px', height: 'auto', disableClose: false,
      data: {userId: userId}
    });
    dialogRef.afterClosed().subscribe(
      pass => {
        if(pass != null){
          this.blockUI.start()
          this.userService.getUser(userId, pass).subscribe(
            res => { 
              res.password = pass;
              this.blockUI.stop()
              this.openUsersModal(res)
            }, error => {
              this.msgService.error('Erro ao buscar usuário.')
              this.blockUI.stop()
            }
          )
        }
      }
    )
  }

  deleteUser(user:any){
    let dialogRef = this.dialog.open(ConfirmActionComponent,{
      width: '400px', height: 'auto', disableClose: false,
      data: {text: 'Excluir o usuário ' + user.username + '?'}
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if(res){
          this.blockUI.start()
          this.userService.deleteUser(user.id).subscribe(
            res => {
              this.msgService.success('Usuário deletado.')
              this.blockUI.stop()
              this.readAllUsers();
            }, error => {
              this.msgService.error('Erro ao deletar usuário.')
              this.blockUI.stop()
            }
          )
        }
      }
    )
  }

  isEnabled(status){
    return status == true? 'Ativo':'Inativo';
  }

  alterStatus(userId){
    this.blockUI.start()
    this.userService.alterUserStatus(userId).subscribe(
      res => {
        this.msgService.success('Status alterado.')
        this.blockUI.stop()
      }, error => {
        this.msgService.error('Erro ao alterar status.')
        this.blockUI.stop()
      }
    )
  }

  openUsersModal(user){
    let dialogRef = this.dialog.open(UserRegisterComponent,{
      width: '400px', height: 'auto', disableClose: false,
      data: {user: user}
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if(res != null){
          if(res.id == null){
            this.createUser(res);
          }else{
            this.updateUser(res);
          }
        }
      }
    );
  }

  applyFilter(event: Event) {
    this.filterConfiguration();
    const filterValue = (event.target as HTMLInputElement).value;    
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }

  filterConfiguration(){
    this.dataTable.filterPredicate = (data: User, filter: string) => data.name.indexOf(filter) != -1 || data.email.indexOf(filter) != -1 || data.username.indexOf(filter) != -1;
  }
}
