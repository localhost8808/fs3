import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

interface Note {
  id: string;
  text: string;
  time: string;
  isEditing?: boolean;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  notes: Note[] = [];
  newNote: string = '';
  currentTime: string = '';
  editingNote: string = '';
  private intervalId: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Load notes from cookies
    const savedNotes = this.getCookie('notes');
    if (savedNotes) {
      this.notes = JSON.parse(savedNotes);
    }

    // Update system time every second
    this.intervalId = setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleString();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  addNote() {
    if (this.newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        text: this.newNote,
        time: new Date().toLocaleString()
      };
      this.notes.push(note);
      this.newNote = '';
      this.saveNotesToCookies();
    }
  }

  deleteNote(id: string) {
    this.notes = this.notes.filter(note => note.id !== id);
    this.saveNotesToCookies();
  }

  startEditing(note: Note) {
    note.isEditing = true;
    this.editingNote = note.text;
  }

  saveEdit(note: Note) {
    note.text = this.editingNote;
    note.time = new Date().toLocaleString() + ' (edited)';
    note.isEditing = false;
    this.saveNotesToCookies();
  }

  cancelEdit(note: Note) {
    note.isEditing = false;
  }

  private saveNotesToCookies() {
    const notesString = JSON.stringify(this.notes);
    document.cookie = `notes=${encodeURIComponent(notesString)}; max-age=86400`; // Expires in 24 hours
  }

  private getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }
}
