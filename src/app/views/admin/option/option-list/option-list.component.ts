import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpUtil} from '../../../../core/net/httpUtil';
import {NzMessageService} from 'ng-zorro-antd';
import {UserCreateComponent} from '../../user/user-create/user-create.component';
import {UserUpdateComponent} from '../../user/user-update/user-update.component';
import {OptionCreateComponent} from '../option-create/option-create.component';
import {OptionUpdateComponent} from '../option-update/option-update.component';

export interface OptionInterface {
  id: number;
  key: string;
  value: string;
  remark: string;
  type: number;
  createTime: string;
  updateTime: string;
}

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.css']
})

export class OptionListComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtil,
    private cfr: ComponentFactoryResolver,
    private message: NzMessageService
  ) { }
  user: OptionInterface;
  pageIndex = 1;
  pageSize = 50;
  total = 1;
  loading = true;
  // 数据集
  listOfMapData: OptionInterface[] = [];
  validateForm: FormGroup;

  // 添加弹出框
  @ViewChild('addDom', { static: false, read: ViewContainerRef }) addDom: ViewContainerRef;
  public optionCreateComponent;
  isAddVisible = false;
  isAddOkLoading = false;

  // 添加弹出框
  @ViewChild('updateDom', { static: false, read: ViewContainerRef }) updateDom: ViewContainerRef;
  public optionUpdateComponent;
  isUpdateVisible = false;
  isUpdateOkLoading = false;

  ngOnInit() {
    // 初始化表单
    this.validateForm = this.fb.group({
      key: '',
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
    this.httpUtil.post('/api/option/list', param).then(res => {
      this.loading = false;
      this.total = res.total;
      this.listOfMapData = res.data;
    });
  }

  /**
   * 添加配置
   */
  addUser() {
    this.addDom.clear();
    const dom = this.cfr.resolveComponentFactory(OptionCreateComponent);
    this.optionCreateComponent = this.addDom.createComponent(dom);
    this.isAddVisible = true;
  }

  /**
   * 添加配置取消操作
   */
  addHandleCancel() {
    this.isAddVisible = false;
    this.optionCreateComponent.destroy();
  }

  /**
   * 添加配置确定事件
   */
  addHandleOk() {
    const formValue = this.optionCreateComponent.instance.getFormValue();
    if (!formValue.isSuccess) {return; }
    this.httpUtil.post('/api/option/add', formValue.data).then(res => {
      if (res.code === 200) {
        this.message.success('添加成功');
        this.searchData();
        this.isAddVisible = false;
        this.optionCreateComponent.destroy();
      } else {
        this.message.error('添加失败');
      }
    });
  }

  /**
   * 删除配置
   */
  delete(id) {
    this.httpUtil.delete('/api/option/delete/' + id).then(res => {
      if (res.code === 200) {
        this.message.success('删除成功');
        this.searchData();
      } else {
        this.message.error('删除失败');
      }
    });
  }

  /**
   * 更新配置
   * @param item 信息
   */
  updateMenu(item) {
    this.updateDom.clear();
    const dom = this.cfr.resolveComponentFactory(OptionUpdateComponent);
    this.optionUpdateComponent = this.updateDom.createComponent(dom);
    this.optionUpdateComponent.instance.data = item;
    this.isUpdateVisible = true;
  }

  /**
   * 更新配置取消操作
   */
  updateHandleCancel() {
    this.isUpdateVisible = false;
    this.optionUpdateComponent.destroy();
  }

  /**
   * 更新配置确定事件
   */
  updateHandleOk() {
    const formValue = this.optionUpdateComponent.instance.getFormValue();
    if (!formValue.isSuccess) {return; }
    this.httpUtil.put('/api/option/update', formValue.data).then(res => {
      if (res.code === 200) {
        this.message.success('更新成功');
        this.searchData();
        this.isUpdateVisible = false;
        this.optionUpdateComponent.destroy();
      } else {
        this.message.error('更新失败');
      }
    });
  }

}
