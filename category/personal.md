---
layout: page
title: "Personal & Academic"
permalink: /category/personal/
---

Career milestones, academic research, slides, and personal updates.

<ul class="posts-list">
  {% for post in site.categories["Personal"] %}
    <li>
      <span class="post-date">{{ post.date | date: "%b %d, %Y" }}</span> &raquo; 
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
