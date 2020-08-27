import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpUtil} from '../../../../core/net/httpUtil';
import {StorageUtil} from '../../../../core/storage/storageUtil';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  validateForm: FormGroup;
  // 分页相关
  pageIndex = 1;
  pageSize = 50;
  total = 1;
  listOfData = [];
  loading = true;
  constructor(
    private fb: FormBuilder,
    private httpUtil: HttpUtil,
    public storageUtil: StorageUtil,
    private cfr: ComponentFactoryResolver,
    private message: NzMessageService,
    public router: Router
  ) { }

  ngOnInit() {
    // 初始化表单
    this.validateForm = this.fb.group({
      articleTitle: '',
      isDraft:  0
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
    this.httpUtil.post('/api/article/list', param).then(res => {
      this.loading = false;
      this.total = res.total;
      this.listOfData = res.data;
    });
  }

  /**
   * 更新文章
   * @param id id
   */
  updateArticle(id) {
    this.router.navigate(['/article/create'], {queryParams: {id}});
  }

  /**
   * 删除文章
   * @param id id
   */
  deleteArticle(id) {
    this.httpUtil.delete('/api/article/delete/' + id).then(res => {
      if (res.code === 200) {
        this.message.success('删除成功');
        this.searchData();
      } else {
        this.message.error('删除失败');
      }
    });
  }
}
