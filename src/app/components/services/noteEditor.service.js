export class NoteEditorService {
 //TODO: Note vs Book
    constructor($http, $q, APIURL, moment, notesService) {
        'ngInject';

        Object.assign(this, {
          $http, $q, APIURL, moment, notesService
        });

        this.notes = [];
        this.books = [];
        this.tags = [];
    }

    getEmptyNote() {
        return {
            title: '',
            content: 'good',
            html: '',
            status: 'draft',
            date: this.moment().format(),
            book: '',
            tags: []
        };
    }

    getNote(id) {
        if (id && angular.isNumber(id)) {
            let note = this.notes.find(note => note.id === id);
            if (note && angular.isDefined(note.content)) {
                return this.$q.resolve(note);
            }
            return this.notesService.getNote(id).then(res => {
                let note = res.data.note;
                // TODO
                this.notes.push(note);
                return note;
            });
        }
    }

    getNotes() {
        return this.notesService.getNotes().then(res => {
            let notes = res.data.notes;
            for (var note in notes) {
            this.notes.push(note);
            // TODO: need update
            this.books.push(note.book);
            this.tags.push(note.tags);
            }

            return notes;
        });
    }

    newNote(note) {
        return this.notesService.newNote(note).then(res => {
            let note = res.data.note;
            this.notes.push(note);
            // TODO: need update
            this.books.push(note.book);
            this.tags.push(note.tags);
            return note;
        });
    }

    updateNote(id, note) {
        let _note = this.notes.find(note => note.id === id);
        if (_note && angular.isDefined(_note.content)) {
            _note = note;
        }

        return this.NotesService.updateNote(id, note).then(res => {
            let note = res.data.note;
            this.notes.push(note); //update
            this.books.push(note.book);
            this.tags.push(note.tags);
            return note;
        });
    }

    deleteNote(id) {
        return this.NotesService.deleteNote(id).then(res => {
            this.notes = [];
            this.books = [];
            this.tags = [];
            return res.data;
        });
    }

    getBooks() {
        if (this.books.length) {
            return this.$q.resolve(this.books);
        }
        return this.$http.get(this.APIURL + '/books').then(res => {
            let books = res.data.books;
            this.books = books;
            return books;
        });
    }

    getTags() {
        if (this.tags.length) {
            return this.$q.resolve(this.tags);
        }
        return this.$http.get(this.APIURL + '/tags').then(res => {
            let tags = res.data.tags;
            this.tags = tags;
            return tags;
        });
    }
}
