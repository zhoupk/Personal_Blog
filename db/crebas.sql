/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2016/3/28 11:12:26                           */
/*==============================================================*/

create database personal_blog default charset utf8;
use personal_blog;

drop table if exists admin;

drop table if exists news;

drop table if exists type;

/*==============================================================*/
/* Table: admin                                                 */
/*==============================================================*/
create table admin
(
   admin_id             int not null auto_increment,
   admin_name           varchar(50),
   admin_password       varchar(50),
   admin_issuper        int,
   primary key (admin_id)
);
insert into admin values(default,'zxw@yuanku.org','255662',1);
alter table admin comment 'admin_issuper,ֵ1Ϊ��������Ա';

/*==============================================================*/
/* Table: news                                                  */
/*==============================================================*/
create table news
(
   nid                  int not null auto_increment,
   title                varchar(400),
   content              text,
   admin_id             int,
   addtime              datetime,
   typeid               int,
   readCount            int,
   primary key (nid)
);

drop table if exists comment;

/*==============================================================*/
/* Table: comment                                               */
/*==============================================================*/
create table comment
(
   cid                int not null auto_increment,
   cname                varchar(50),
   ccontent             text,
   nid                  int,
   parent_cid           int
   primary key (cid)
);


/*==============================================================*/
/* Table: type                                                  */
/*==============================================================*/
create table type
(
   typeid               int not null auto_increment,
   typename             varchar(50),
   parent_typeid        int,
   typeorder            int,
   primary key (typeid)
);

drop table if exists photos;

/*==============================================================*/
/* Table: photos                                                */
/*==============================================================*/
create table photos
(
   pid                  int not null auto_increment,
   pname                varchar(50),
   paddtime             datetime,
   primary key (pid)
);


drop table if exists images;

/*==============================================================*/
/* Table: images                                                */
/*==============================================================*/
create table images
(
   imgid                int not null auto_increment,
   imgname              varchar(500),
   imgurl               varchar(100),
   addtime              datetime,
   pid                  int,
   primary key (imgid)
);

alter table images add constraint FK_Reference_3 foreign key (pid)
      references photos (pid) on delete restrict on update restrict;

alter table news add constraint FK_Reference_1 foreign key (typeid)
      references type (typeid) on delete restrict on update restrict;

alter table news add constraint FK_Reference_2 foreign key (admin_id)
      references admin (admin_id) on delete restrict on update restrict;

