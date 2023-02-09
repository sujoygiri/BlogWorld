import { AfterViewInit, Component, OnInit } from '@angular/core';
import EditorJS from "@editorjs/editorjs";

const ImageTool = require("@editorjs/image");
const Header = require("@editorjs/header");
const Quote = require("@editorjs/quote");
const List = require("@editorjs/list");
const Table = require("@editorjs/table");
const Delimiter = require('@editorjs/delimiter');
const CodeTool = require('@editorjs/code');
const Embed = require('@editorjs/embed');
const Underline = require('@editorjs/underline');
const Marker = require('@editorjs/marker');
const InlineCode = require('@editorjs/inline-code');

import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.css']
})
export class BlogEditorComponent implements OnInit, AfterViewInit {

  private editor!: EditorJS;
  constructor(private globalService: GlobalService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.editor = new EditorJS({
      // autofocus:true,
      holder: 'editor',
      placeholder: 'Write your content here',
      inlineToolbar: ['bold', 'italic', 'underline', 'link', 'marker', 'inlineCode'],
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        underline: Underline,
        marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M',
        },
        quote: {
          class: Quote,
          shortcut: 'CMD+SHIFT+Q',
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author',
          },
        },
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+M',
        },
        list: {
          class: List,
          config: {
            defaultStyle: 'unordered'
          }
        },
        table: {
          class: Table,
          config: {
            rows: 2,
            cols: 3
          },
        },
        image: {
          class: ImageTool,
          config: {
            field: 'image',
            endpoints: {
              byFile: 'http://127.0.0.1:8080/api/blogs/upload-image',
              byUrl: 'http://127.0.0.1:8080/api/blogs/upload-image',
            }
          }
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              fackebook: true,
              instagram: true,
              twitter: true,
              codepen: true
            },
          },
        },
        code: {
          class: CodeTool,
          shortcut: 'CMD+SHIFT+P',
          config: {
            placeholder: 'Enter your code here',
          }
        },
        delimiter: Delimiter,
      }
    });
  }

  async onSubmit() {
    let editorData = await this.editor.save();
    console.log(editorData);
    this.globalService.onSubmitEditorJsData(editorData).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Completed');
      }
    });
  }
}
