import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpUtil} from '../../../../core/net/httpUtil';
import {StorageUtil} from '../../../../core/storage/storageUtil';
import {NzMessageService} from 'ng-zorro-antd';
import {MenusCreateComponent} from '../../menus/menus-create/menus-create.component';
import {MenusUpdateComponent} from '../../menus/menus-update/menus-update.component';
import {TreeNodeInterface} from '../../menus/menus-list/menus-list.component';
import {UserUpdateComponent} from '../user-update/user-update.component';
import {UserCreateComponent} from '../user-create/user-create.component';

export interface UserInterface {
  id: number;
  name: string;
  account: string;
  password: string;
  email: string;
  sex: number;
  age: number;
  status: number;
  createTime: string;
  updateTime: string;
  roles?: RoleInterface[];
}
export interface RoleInterface {
  id: number;
  roleName: string;
  roleCode: string;
  createTime: string;
  updateTime: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtil,
    private cfr: ComponentFactoryResolver,
    private message: NzMessageService
  ) { }
  pageIndex = 1;
  pageSize = 50;
  total = 1;
  loading = true;
  // 数据集
  listOfMapData: UserInterface[] = [];
  validateForm: FormGroup;

  // 添加弹出框
  @ViewChild('addDom', { static: false, read: ViewContainerRef }) addDom: ViewContainerRef;
  public userCreateComponent;
  isAddVisible = false;
  isAddOkLoading = false;

  // 添加弹出框
  @ViewChild('updateDom', { static: false, read: ViewContainerRef }) updateDom: ViewContainerRef;
  public userUpdateComponent;
  isUpdateVisible = false;
  isUpdateOkLoading = false;

  ngOnInit() {
    // 初始化表单
    this.validateForm = this.fb.group({
      status: '0',
      name: '',
      email: '',
    });
    this.searchData();
  }

  /**
   * 加载数据
   */
  searchData(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    const param = {
      pageIndex: 1,
      pageSize: 50,
      form: null,
    };
    param.pageIndex = this.pageIndex;
    param.pageSize = this.pageSize;
    param.form = this.validateForm.value;
    this.loading = true;
    this.httpUtil.post('/user/list', param).then(res => {
      this.loading = false;
      this.total = res.total;
      this.listOfMapData = res.data;
      console.log(this.listOfMapData);
    });
  }

  /**
   * 添加用户
   */
  addUser() {
    this.addDom.clear();
    const dom = this.cfr.resolveComponentFactory(UserCreateComponent);
    this.userCreateComponent = this.addDom.createComponent(dom);
    this.isAddVisible = true;
  }

  /**
   * 添加节点取消操作
   */
  addHandleCancel() {
    this.isAddVisible = false;
    this.userCreateComponent.destroy();
  }

  /**
   * 添加节点确定事件
   */
  addHandleOk() {
    const formValue = this.userCreateComponent.instance.getFormValue();
    if (!formValue.isSuccess) {return; }
    this.httpUtil.post('/user/add', formValue.data).then(res => {
      if (res.code === 200) {
        this.message.success('添加成功');
        this.searchData();
        this.isAddVisible = false;
        this.userCreateComponent.destroy();
      } else {
        this.message.error('添加失败');
      }
    });
  }

  /**
   * 删除菜单
   */
  delete(id) {
    this.httpUtil.delete('/menu/delete/' + id).then(res => {
      if (res.code === 200) {
        this.message.success('删除成功');
        this.searchData();
      } else {
        this.message.error('删除失败');
      }
    });
  }

  /**
   * 更新状态
   * @param id id
   * @param status 状态
   */
  updateStatus(id, status) {
    this.httpUtil.put('/menu/updateStatus', {id, status}).then(res => {
      if (res.code === 200) {
        this.message.success('状态更新成功');
        this.searchData();
      } else {
        this.message.error('状态更新失败');
      }
    });
  }

  /**
   * 更新菜单
   * @param item 信息
   */
  updateMenu(item) {
    this.updateDom.clear();
    const dom = this.cfr.resolveComponentFactory(UserUpdateComponent);
    this.userUpdateComponent = this.updateDom.createComponent(dom);
    this.userUpdateComponent.instance.data = item;
    this.isUpdateVisible = true;
  }

  /**
   * 更新节点取消操作
   */
  updateHandleCancel() {
    this.isUpdateVisible = false;
    this.userUpdateComponent.destroy();
  }

  /**
   * 更新节点确定事件
   */
  updateHandleOk() {
    const formValue = this.userUpdateComponent.instance.getFormValue();
    if (!formValue.isSuccess) {return; }
    this.httpUtil.put('/menu/update', formValue.data).then(res => {
      if (res.code === 200) {
        this.message.success('更新成功');
        this.searchData();
        this.isUpdateVisible = false;
        this.userUpdateComponent.destroy();
      } else {
        this.message.error('更新失败');
      }
    });
  }

}
