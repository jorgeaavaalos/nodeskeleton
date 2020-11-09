module.exports = {
    formatDate: function (date, options) {
        return date.toString().slice(4, 24);
    },
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
        let new_str = str + ' '
        new_str = str.substr(0, len)
        new_str = str.substr(0, new_str.lastIndexOf(' '))
        new_str = new_str.length > 0 ? new_str : str.substr(0, len)
        return new_str + '...'
        }
        return str
    },
    stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '')
    },
    editIcon: function (storyUser, loggedUser, storyId, floating = true) {
        if (storyUser._id.toString() == loggedUser._id.toString()) {
        if (floating) {
            return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
        } else {
            return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
        }
        } else {
        return ''
        }
    },
    select: function (selected, options) {
        return options
        .fn(this)
        .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
        )
        .replace(
            new RegExp('>' + selected + '</option>'),
            ' selected="selected"$&'
        )
    },
    noBlur: function(link) {
        if(link.length === 42)
            return link.slice(0, 37);
        else if(link.length === 43)
            return link.slice(0, 38);
        else {
            return link.slice(0, 39)
        }
    },
    createMenu: function(index, upperLimit) {
        let html;
        if(index != 1) {
            html = `<a href="/user?page=${index - 1}">Back</a><a href="/user?page=${index}" class="page-number first-page">${index}</a>`
        } else {
            html = `<a href="/user?page=${index}" class="page-number first-page">${index}</a>`
        }
        let difference = upperLimit - index;
        let index2 = index;
        if(difference > 10) {
            for(let x = 0; x < 10; x++) {
                html +=  `<a href="/user?page=${index2 + 1}" class="page-number">${index2 + 1}</a>`;
                index2++;
            }
        } else {
            // console.log('Hay menos de diez cuadritos')
            for(let x = 0; x < difference; x++) {
                html +=  `<a href="/user?page=${index2 + 1}" class="page-number">${index2 + 1}</a>`;
                index2++;
            }
        }
        if(index != upperLimit) {
            html += `<a href="/user?page=${index + 1}">Next</a>`;
        }
        return html;
    }
}
