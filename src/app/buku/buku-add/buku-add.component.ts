import { Component, OnInit, ViewChild, ElementRef, Output, Input } from '@angular/core';
import { Buku } from '../buku.models';
import { EventEmitter } from '@angular/core';
import { BukusService } from '../bukus.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-buku-add',
  templateUrl: './buku-add.component.html',
  styleUrls: ['./buku-add.component.css'],
  providers: [BukusService]
})
export class BukuAddComponent implements OnInit {

  @ViewChild('inputJumlah') inputJumlah: ElementRef;
  
  @Output() bukuAdded = new EventEmitter<Buku>();

  @Input() bukuChild: Buku;

  @Input() bukuEditParent: Buku;

  inputInfo = new Buku ();

  contactForm: FormGroup;

  constructor(private bukuService: BukusService) { }

  ngOnInit() {
    this.contactForm = new FormGroup ({
      isbn: new FormControl(null,[Validators.required, this.cekIsEmpty]),
      namabuku: new FormControl(null,[Validators.required, this.cekIsEmpty]),
      jumlah: new FormControl(null,[Validators.required, this.cekIsEmpty])
    });
  }

  kirim() {
    const buku = new Buku ();
    
    buku.isbn = this.contactForm.get('isbn').value;
    buku.namabuku = this.contactForm.get('namabuku').value;
    buku.jumlah = this.contactForm.get('jumlah').value;
    console.log(buku);
    this.bukuAdded.emit(buku);
  }

  cekIsEmpty(control: FormControl): { [s: string]: boolean} {
    if (control.value && control.value.trim().length === 0) {
      return {'blank': true};
    }
    return null;
  }

  tambahBuku() {
    this.bukuAdded.emit(this.bukuService.convertBuku(this.inputInfo));
    this.inputInfo = new Buku();
  }
}
