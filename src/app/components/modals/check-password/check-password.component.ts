import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-check-password',
  templateUrl: './check-password.component.html',
  styleUrls: ['./check-password.component.css']
})
export class CheckPasswordComponent implements OnInit {
  
  @BlockUI() blockUI: NgBlockUI;
  pass = '';
  constructor(
    private msgService: ToastrService,
    public dialogRef: MatDialogRef<CheckPasswordComponent>,
    public userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  save(){
    if(this.checkField()){
      this.blockUI.start()
      this.userService.checkPassword(this.data.userId, this.pass).subscribe(
        res => {
          this.blockUI.stop()
          if(res){
            this.dialogRef.close(this.pass);
          }else{
            this.msgService.warning('Senha incorreta!')
          }
        }, error => {
          this.msgService.error('Erro ao deletar usuário.')
          this.blockUI.stop()
        }
      )
    }
  }

  close(){
    this.dialogRef.close(null);
  }

  checkField(){
    if(this.pass == ''){
      this.msgService.warning('O campo senha é obrigatório!');
      return false;
    }else{
      return true;
    }
  }
}
