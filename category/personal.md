---
layout: page
title: "Personal & Academic"
permalink: /category/personal/
---

Career milestones, academic research, slides, and personal updates.

<ul class="posts-list">
    <li>
      <span class="post-date">01 Jun, 2026</span> &raquo; 
      <a href="{{ '/resume/' | relative_url }}">📄 Resume</a>
    </li>

    <li>
      <span class="post-date">01 Jun, 2026</span> &raquo; 
      <a href="{{ '/assets/presentations/Timeline/timeline.pdf' | relative_url }}" target="_blank">⏳ Career
              Timeline</a>
    </li>

  {% for post in site.categories["Personal"] %}
    <li>
      <span class="post-date">{{ post.date | date: "%b %d, %Y" }}</span> &raquo; 
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}

</ul>
