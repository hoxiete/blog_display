<template>
  <div class="articles">
    <banner :src="article.imageUrl"></banner>
    <div class="site-content animate">
      <main class="site-main">
        <article class="hentry">
          <!-- 文章头部 -->
          <header class="entry-header">
            <!-- 标题输出 -->
            <h1 class="entry-title">{{article.title}}</h1>
            <hr />
            <div class="breadcrumbs">
              <div id="crumbs">最后更新时间：{{article.updateTime | parseTime}}</div>
            </div>
          </header>
          <!-- 正文输出 -->
          <div class="entry-content" v-html="article.bodyHtml"></div>
          <!-- 文章底部 -->
          <section-title>
            <footer class="post-footer">
              <!-- 阅读次数 -->
              <div class="post-like">
                <i class="iconfont iconeyes"></i>
                <span class="count">685</span>
              </div>
              <!-- 分享按钮 -->
              <!--                        <div class="post-share">-->
              <!--                            <ul class="sharehidden">-->
              <!--                                <li><a href="http://qr.liantu.com/api.php?text=https://zhebk.cn/Web/gongan.html"-->
              <!--                                       onclick="window.open(this.href, 'renren-share', 'width=490,height=700');return false;"-->
              <!--                                       class="s-weixin" target="_blank" rel="nofollow noopener noreferrer"><img src="https://cdn.zhebk.cn/usr/themes/Akina/images/wechat.png"></a></li>-->
              <!--                                <li>-->
              <!--                                    <a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=https://zhebk.cn/Web/gongan.html/&amp;title=公安联网备案记录"-->
              <!--                                       onclick="window.open(this.href, 'weibo-share', 'width=730,height=500');return false;"-->
              <!--                                       class="s-qq" target="_blank" rel="nofollow noopener noreferrer"><img src="https://cdn.zhebk.cn/usr/themes/Akina/images/qzone.png"></a></li>-->
              <!--                                <li>-->
              <!--                                    <a href="http://service.weibo.com/share/share.php?url=https://zhebk.cn/Web/gongan.html/&amp;title=公安联网备案记录"-->
              <!--                                       onclick="window.open(this.href, 'weibo-share', 'width=550,height=235');return false;"-->
              <!--                                       class="s-sina" target="_blank" rel="nofollow noopener noreferrer"><img src="https://cdn.zhebk.cn/usr/themes/Akina/images/sina.png"></a></li>-->
              <!--                                <li>-->
              <!--                                    <a href="http://shuo.douban.com/!service/share?https://zhebk.cn/Web/gongan.html/&amp;title=公安联网备案记录"-->
              <!--                                       onclick="window.open(this.href, 'renren-share', 'width=490,height=600');return false;"-->
              <!--                                       class="s-douban" target="_blank" rel="nofollow noopener noreferrer"><img src="https://cdn.zhebk.cn/usr/themes/Akina/images/douban.png"></a></li>-->
              <!--                            </ul>-->
              <!--                            <i class="iconfont show-share"></i>-->
              <!--                        </div>-->
              <!-- 赞助按钮 -->
              <div class="donate" @click="showDonate=!showDonate">
                <span>赏</span>
                <ul class="donate_inner" :class="{'show':showDonate}">
                  <li class="wedonate">
                    <img src="http://cdn.fengziy.cn/gblog/wexin_pay.png" />
                    <p>微信</p>
                  </li>
                  <li class="alidonate">
                    <img src="http://cdn.fengziy.cn/gblog/ali_pay.jpg" />
                    <p>支付宝</p>
                  </li>
                </ul>
              </div>
              <!-- 文章标签 -->
              <div class="post-tags">
                <i class="iconfont iconcategory"></i>
                <router-link to="/category/web">Web</router-link>
              </div>
            </footer>
          </section-title>

          <!--声明-->
          <div class="open-message">
            <p>
              声明：Gblog博客|版权所有，违者必究|如未注明，均为原创|本网站采用
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/3.0/"
                target="_blank"
              >BY-NC-SA</a>协议进行授权
            </p>
            <p>
              转载：转载请注明原文链接 -
              <a href="/">看一遍闭着眼都会安装Lua了</a>
            </p>
          </div>
          <!--评论-->
          <div class="comments">
            <comment v-for="item in comments" :key="item.comment.id" :comment="item.comment">
              <template v-if="item.reply.length">
                <comment v-for="reply in item.reply" :key="reply.id" :comment="reply"></comment>
              </template>
            </comment>
          </div>
        </article>
      </main>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/banner";
import sectionTitle from "@/components/section-title";
import comment from "@/components/comment";
import { fetchComment, fetchArticle } from "../api";
export default {
  name: "articles",
  data() {
    return {
      showDonate: false,
      comments: [],
      article: {},
    };
  },
  components: {
    Banner,
    sectionTitle,
    comment,
  },
  computed: {
    articleId() {
      return this.$route.params.id;
    }
  },
  methods: {
    getComment() {
      fetchComment()
        .then((res) => {
          this.comments = res.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getArticle() {
      fetchArticle(this.articleId)
        .then((res) => {
          debugger;
          this.article = res.data || {};
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getArticle();
    this.getComment();
  },
};
</script>
<style scoped lang="less">
.site-content {
  .site-main {
    padding: 80px 0 0 0;
  }
}

article.hentry {
  .entry-header {
    .entry-title {
      font-size: 23px;
      font-weight: 600;
      color: #737373;
      margin: 0.67em 0;

      &:before {
        content: "#";
        margin-right: 6px;
        color: #d82e16;
        font-size: 20px;
        font-weight: 600;
      }
    }

    hr {
      height: 1px;
      border: 0;
      background: #efefef;
      margin: 15px 0;
    }

    .breadcrumbs {
      font-size: 14px;
      color: #d2d2d2;
      text-decoration: none;
      margin-bottom: 30px;
    }
  }

  .entry-content {
  }

  footer.post-footer {
    width: 100%;
    padding: 20px 10px;
    margin-top: 30px;
    height: 65px;
    position: relative;
    i {
      font-size: 18px;
      margin-right: 5px;
    }
    .post-like {
      float: right;
      margin: 7px 0 0 20px;
    }

    .post-share {
      float: right;
      list-style: none;
      margin-right: 20px;
    }

    .donate {
      float: left;
      line-height: 36px;
      border-radius: 100%;
      -webkit-border-radius: 100%;
      -moz-border-radius: 100%;
      border: 1px solid #2b2b2b;
      &:hover {
        border: 1px solid goldenrod;
        span {
          color: goldenrod;
        }
      }
      span {
        color: #2b2b2b;
        padding: 10px;
        position: relative;
        cursor: pointer;
      }

      .donate_inner {
        display: none;
        margin: 0;
        list-style: none;
        position: absolute;
        left: 80px;
        top: -40px;
        background: #fff;
        padding: 10px;
        border: 1px solid #ddd;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        border-radius: 3px;
        &.show {
          display: block;
        }
        li {
          float: left;
        }

        img {
          width: 100px;
        }
        p {
          text-align: center;
          font-size: 15px;
          color: #d2d2d2;
          line-height: 1rem;
        }
      }

      .donate_inner:after,
      .donate_inner:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 45%;
        margin-left: -8px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid #fff;
      }

      .donate_inner:before {
        left: -1px;
        border-right: 8px solid #ddd;
      }
    }

    .post-tags {
      margin: 7px 0 0 20px;
      float: left;
      text-transform: uppercase;
      a:hover {
        color: #ff6d6d;
      }
    }
  }
  .open-message {
    margin: 50px 0;
    position: relative;
    background: #2b2b2b;
    padding: 10px 30px;
    border-radius: 3px;
    font-size: 14px;
    color: #fff;
    &:after {
      content: "";
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #2b2b2b;
      position: absolute;
      top: -8px;
      left: 48%;
    }
    p {
      margin: 10px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    a {
      color: #a0dad0;
      padding: 0 5px;
    }
  }
}
</style>
