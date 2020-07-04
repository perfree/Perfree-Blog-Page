import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-article-create-success',
  templateUrl: './article-create-success.component.html',
  styleUrls: ['./article-create-success.component.css']
})
export class ArticleCreateSuccessComponent implements OnInit {
  resultTitle = '文章发表成功';
  toArticleBtnIsShow = true;

  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((res) => {
      if (res.type === 1 || res.type === '1') {
        this.resultTitle = '文章已保存至草稿箱';
        this.toArticleBtnIsShow = false;
      }
    });
  }

  /**
   * 在写一篇
   */
  addArticle() {
    this.router.navigate(['/admin/article/create']);
  }

  /**
   * 查看文章
   */
  toArticle() {
    // this.router.navigate(['/admin/article/create']);
  }
}
