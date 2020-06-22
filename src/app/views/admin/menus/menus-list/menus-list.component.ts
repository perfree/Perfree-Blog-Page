import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpUtil} from '../../../../core/net/httpUtil';
import {StorageUtil} from '../../../../core/storage/storageUtil';
import {MenusCreateComponent} from '../menus-create/menus-create.component';

export interface TreeNodeInterface {
  id: string;
  menuName: string;
  menuIcon: string;
  menuPath: string;
  seq: number;
  target: string;
  createTime: string;
  updateTime: string;
  source: number;
  flag: number;
  status: number;
  type: number;
  pid: string;
  level?: number;
  expand?: boolean;
  childMenu?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
}

@Component({
  selector: 'app-menus-list',
  templateUrl: './menus-list.component.html',
  styleUrls: ['./menus-list.component.css']
})
export class MenusListComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtil,
    public storageUtil: StorageUtil,
    private cfr: ComponentFactoryResolver,
    private message: NzMessageService
  ) { }
  pageIndex = 1;
  pageSize = 50;
  total = 1;
  loading = true;
  // 数据集
  listOfMapData: TreeNodeInterface[] = [];
  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};
  validateForm: FormGroup;

  // 添加弹出框
  @ViewChild('addDom', { static: false, read: ViewContainerRef }) addDom: ViewContainerRef;
  public menuCreateComponent;
  isAddVisible = false;
  isAddOkLoading = false;
  addTitle = '添加一级菜单';

  static visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.id]) {
      hashMap[node.id] = true;
      array.push(node);
    }
  }

  /**
   * 转换树形数据
   * @param root 节点
   */
  static convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
    const stack: TreeNodeInterface[] = [];
    const array: TreeNodeInterface[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });
    while (stack.length !== 0) {
      // tslint:disable-next-line:no-non-null-assertion
      const node = stack.pop()!;
      MenusListComponent.visitNode(node, hashMap, array);
      if (node.childMenu && node.childMenu.length > 0) {
        for (let i = node.childMenu.length - 1; i >= 0; i--) {
          // tslint:disable-next-line:no-non-null-assertion
          stack.push({ ...node.childMenu[i], level: node.level! + 1, expand: false, parent: node });
        }
      }
    }
    return array;
  }

  ngOnInit() {
    // 初始化表单
    this.validateForm = this.fb.group({
      menuName: '',
      type: '0'
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
    this.httpUtil.post('/menu/list', param).then(res => {
      this.loading = false;
      this.total = res.total;
      this.listOfMapData = res.data;
      this.listOfMapData.forEach(item => {
        this.mapOfExpandedData[item.id] = MenusListComponent.convertTreeToList(item);
      });
    });
  }

  /**
   * 展开,关闭列表
   * @param array ...
   * @param data ...
   * @param $event ...
   */
  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if ($event === false) {
      if (data.childMenu) {
        data.childMenu.forEach(d => {
          // tslint:disable-next-line:no-non-null-assertion
          const target = array.find(a => a.id === d.id)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  /**
   * 添加菜单
   */
  addMenu(isParent, pid) {
    if (isParent) {
      this.addTitle = '添加一级菜单';
    } else {
      this.addTitle = '添加子菜单';
    }
    this.addDom.clear();
    const dom = this.cfr.resolveComponentFactory(MenusCreateComponent);
    this.menuCreateComponent = this.addDom.createComponent(dom);
    this.menuCreateComponent.instance.isParent = isParent;
    this.menuCreateComponent.instance.pid = pid;
    this.isAddVisible = true;
  }

  /**
   * 添加节点取消操作
   */
  addHandleCancel() {
    this.isAddVisible = false;
    this.menuCreateComponent.destroy();
  }

  /**
   * 添加节点确定事件
   */
  addHandleOk() {
    // console.log(this.templateCreateComponent.instance.listWatchResult);
    const formValue = this.menuCreateComponent.instance.getFormValue();
    if (!formValue.isSuccess) {return; }
    this.httpUtil.post('/menu/add', formValue.data).then(res => {
     if (res.code === 200) {
       this.message.success('添加成功');
       this.searchData();
       this.isAddVisible = false;
       this.menuCreateComponent.destroy();
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
}
