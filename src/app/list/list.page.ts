import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-list",
  templateUrl: "list.page.html",
  styleUrls: ["list.page.scss"]
})
export class ListPage implements OnInit {
  private selectedItem: any;
  selectedCategory: any;
  private icons = [
    "contact",
    "heart",
    "star",
    "clock",
    "basketball",
    "paper-plane",
    "american-football",
    "boat",
    "bluetooth",
    "build"
  ];
  private list = [
    "   ",
    "My Places",
    "Favourites",
    "Top Rated",
    "Recently Added",
    "Alphabatical"
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor() {
    for (let i = 1; i < this.list.length; i++) {
      this.items.push({
        title: this.list[i],
        note: "" + i,
        icon: this.icons[i - 1]
      });
    }
  }

  onTap(x: any) {
    this.selectedCategory = x;
    console.log('selected category:',x);
  }

  regardingFucntion() {


  }
  ngOnInit() {}
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
