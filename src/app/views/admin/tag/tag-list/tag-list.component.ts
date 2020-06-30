import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpUtil} from '../../../../core/net/httpUtil';
import {StorageUtil} from '../../../../core/storage/storageUtil';
import {NzMessageService} from 'ng-zorro-antd';
import {CategoryCreateComponent} from '../../category/category-create/category-create.component';
import {TagCreateComponent} from '../tag-create/tag-create.component';
import {CategoryUpdateComponent} from '../../category/category-update/category-update.component';
import {TagUpdateComponent} from '../tag-update/tag-update.component';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {
  validateForm: FormGroup;
  // 分页相关
  pageIndex = 1;
  pageSize = 50;
  total = 1;
  listOfData = [];
  loading = true;

  // 添加弹出框
  @ViewChild('addDom', { static: false, read: ViewContainerRef }) addDom: ViewContainerRef;
  public tagCreateComponent;
  isAddVisible = false;
  isAddOkLoading = false;

  // 更新的弹出框
  @ViewChild('updateDom', { static: false, read: ViewContainerRef }) updateDom: ViewContainerRef;
  public tagUpdateComponent;
  isUpdateVisible = false;
  isUpdateOkLoading = false;

  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtil,
    public storageUtil: StorageUtil,
    private cfr: ComponentFactoryResolver,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    // 初始化表单
    this.validateForm = this.fb.group({
      tagName: '',
    });
    this.searchData(true);
  }

  /**
   * 加载数据
   * @param reset 重置
   */
  searchData(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    const param = {
      pageIndex: 1,
      pageSize: 30,
      form: null,
    };
    param.pageIndex = this.pageIndex;
    param.pageSize = this.pageSize;
    param.form = this.validateForm.value;
    this.loading = true;
    this.httpUtil.post('/tag/list', param).then(res => {
      this.loading = false;
      this.total = res.total;
      this.listOfData = res.data;
    });
  }

  /**
   * 添加标签
   */
  addTag() {
    this.addDom.clear();
    const dom = this.cfr.resolveComponentFactory(TagCreateComponent);
    this.tagCreateComponent = this.addDom.createComponent(dom);
    this.isAddVisible = true;
  }

  /**
   * 添加标签取消
   */
  addHandleCancel() {
    this.isAddVisible = false;
    this.tagCreateComponent.destroy();
  }

  /**
   * 添加标签确定
   */
  addHandleOk() {
    const formValue = this.tagCreateComponent.instance.getFormValue();
    if (!formValue.isSuccess) {return; }
    this.httpUtil.post('/tag/add', formValue.data).then(res => {
      if (res.code === 200) {
        this.message.success('添加成功');
        this.searchData();
        this.isAddVisible = false;
        this.tagCreateComponent.destroy();
      } else {
        this.message.error('添加失败');
      }
    });
  }

  /**
   * 更新标签取消
   */
  updateHandleCancel() {
    this.isUpdateVisible = false;
    this.tagUpdateComponent.destroy();
  }

  /**
   * 更新标签确定
   */
  updateHandleOk() {
    const formValue = this.tagUpdateComponent.instance.getFormValue();
    if (!formValue.isSuccess) {return; }
    this.httpUtil.post('/tag/update', formValue.data).then(res => {
      if (res.code === 200) {
        this.message.success('更新成功');
        this.searchData();
        this.isUpdateVisible = false;
        this.tagUpdateComponent.destroy();
      } else {
        this.message.error('更新失败');
      }
    });
  }

  /**
   * 更新标签
   * @param data 数据
   */
  updateTag(data: any) {
    this.updateDom.clear();
    const dom = this.cfr.resolveComponentFactory(TagUpdateComponent);
    this.tagUpdateComponent = this.updateDom.createComponent(dom);
    this.tagUpdateComponent.instance.data = data;
    this.isUpdateVisible = true;
  }

  /**
   * 删除标签
   * @param data 数据
   */
  deleteTag(data: any) {
    this.httpUtil.delete('/tag/delete/' + data.id).then(res => {
      if (res.code === 200) {
        this.message.success('删除成功');
        this.searchData();
      } else {
        this.message.error('删除失败');
      }
    });
  }
}
