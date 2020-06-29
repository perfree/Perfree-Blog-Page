import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpUtil} from '../../../../core/net/httpUtil';
import {StorageUtil} from '../../../../core/storage/storageUtil';
import {NzMessageService} from 'ng-zorro-antd';
import {CategoryCreateComponent} from '../category-create/category-create.component';
import {CategoryUpdateComponent} from '../category-update/category-update.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  validateForm: FormGroup;
  // 分页相关
  pageIndex = 1;
  pageSize = 50;
  total = 1;
  listOfData = [];
  loading = true;

  // 添加弹出框
  @ViewChild('addDom', { static: false, read: ViewContainerRef }) addDom: ViewContainerRef;
  public categoryCreateComponent;
  isAddVisible = false;
  isAddOkLoading = false;

  // 更新的弹出框
  @ViewChild('updateDom', { static: false, read: ViewContainerRef }) updateDom: ViewContainerRef;
  public categoryUpdateComponent;
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
      categoryName: '',
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
    this.httpUtil.post('/category/list', param).then(res => {
      this.loading = false;
      this.total = res.total;
      this.listOfData = res.data;
    });
  }

  /**
   * 添加分类
   */
  addCategory() {
    this.addDom.clear();
    const dom = this.cfr.resolveComponentFactory(CategoryCreateComponent);
    this.categoryCreateComponent = this.addDom.createComponent(dom);
    this.isAddVisible = true;
  }

  /**
   * 添加分类取消
   */
  addHandleCancel() {
    this.isAddVisible = false;
    this.categoryCreateComponent.destroy();
  }

  /**
   * 添加分类确定
   */
  addHandleOk() {
    const formValue = this.categoryCreateComponent.instance.getFormValue();
    if (!formValue.isSuccess) {return; }
    this.httpUtil.post('/category/add', formValue.data).then(res => {
      if (res.code === 200) {
        this.message.success('添加成功');
        this.searchData();
        this.isAddVisible = false;
        this.categoryCreateComponent.destroy();
      } else {
        this.message.error('添加失败');
      }
    });
  }

  /**
   * 更新分类
   * @param data 数据
   */
  updateCategory(data: any) {
    this.updateDom.clear();
    const dom = this.cfr.resolveComponentFactory(CategoryUpdateComponent);
    this.categoryUpdateComponent = this.updateDom.createComponent(dom);
    this.categoryUpdateComponent.instance.data = data;
    this.isUpdateVisible = true;
  }

  /**
   * 删除分类
   * @param data 数据
   */
  deleteCategory(data: any) {
    this.httpUtil.delete('/category/delete/' + data.id).then(res => {
      if (res.code === 200) {
        this.message.success('删除成功');
        this.searchData();
      } else {
        this.message.error('删除失败');
      }
    });
  }

  /**
   * 更新分类取消
   */
  updateHandleCancel() {
    this.isUpdateVisible = false;
    this.categoryUpdateComponent.destroy();
  }

  /**
   * 更新分类确定
   */
  updateHandleOk() {
    const formValue = this.categoryUpdateComponent.instance.getFormValue();
    if (!formValue.isSuccess) {return; }
    this.httpUtil.post('/category/update', formValue.data).then(res => {
      if (res.code === 200) {
        this.message.success('更新成功');
        this.searchData();
        this.isUpdateVisible = false;
        this.categoryUpdateComponent.destroy();
      } else {
        this.message.error('更新失败');
      }
    });
  }
}
