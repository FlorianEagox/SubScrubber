$(document).ready(() => {
  const selected = [];

  // Allow selection of items
  $('.subscription-select').click((e) => {
    const card = $(e.currentTarget);
    card.toggleClass('bg-info text-white');
    if (card.hasClass('bg-info')) {
      selected.push(card.data().id);
    } else {
      const index = selected.indexOf(card.data().id);

      if (index > -1) {
        selected.splice(index, 1);
      }
    }
  });

  $('#select-all-button').click((e) => {
    selected.length = 0;
    $('.subscription-select').toArray().forEach(card => {
      card = $(card);
      card.addClass('bg-info text-white');
      selected.push(card.data().id);
    });
  });

  $('#deselect-all-button').click((e) => {
    selected.length = 0;
    $('.subscription-select').toArray().forEach(card => {
      card = $(card);
      card.removeClass('bg-info text-white');
    });
  });

  $('#delete-selected-button').click((e) => {
    console.log(selected);

    swal({
      title: `Are you sure you want to delete ${selected.length} subscription${selected.length > 1 ? 's' : ''}?`,
      text: `Once deleted, you will not be able to recover ${selected.length > 1 ? 'these' : 'this'} subscription${selected.length > 1 ? 's' : ''}!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(go_ahead => {
      if (go_ahead) {
        return fetch('/api/v1/subscriptions?delete=' + selected.join('+'), {
          method: 'delete',
        }).then(res => {
          return res.json();
        })
        .then(json => {
          if (json.success) {
            swal("Operation successful.", `${selected.length} subscription${selected.length > 1 ? 's' : ''} deleted.`, "success").then(_ => window.location.reload(true));
          } else {
            swal("Oops!", "The operation failed.", "error");
          }
        });
      }
    });
  });
});