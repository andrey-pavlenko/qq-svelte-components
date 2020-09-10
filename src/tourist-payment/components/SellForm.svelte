<script lang="ts">
  export let client: Client;
  export let amount: number = 0;
</script>

<div class="well well-large" style="margin: 0 auto 0 auto; max-width: 640px;">
  <form method="post">

    <fieldset>
      <legend>Предоплата</legend>
      <label>
        <input type="checkbox" />
        Внести предоплату
      </label>
      <input type="number" />

    </fieldset>
    <fieldset>
      <legend>Как с вами связаться?</legend>
      <span class="hide" id="details">not-required</span>
      <div class="alert alert-error hide">
        Введите номер телефона или почту.
      </div>
      <div style="float: left; width: 320px;">
        <label>Имя</label>
        <input
          name="name"
          placeholder="Введите ваше имя или оставьте пустым"
          style="width: 280px;"
          type="text"
        />
        <label>Телефон</label>
        <div id="phone-hidden">
          <input
            readonly
            style="width: 206px;"
            type="text"
            value="79001****33"
          />
          &nbsp;&nbsp;
          <a
            class="change"
            href="#"
            name="phone"
            style="display:inline-block;vertical-align:middle;height:30px;"
          >
            Изменить
          </a>
        </div>
        <div class="hide" id="phone-editor">
          <input name="phone" style="width: 280px;" type="text" />
        </div>
        <label>Email</label>
        <div id="email-hidden">
          <input
            readonly
            style="width: 206px;"
            type="text"
            value="t*****@mail.ru"
          />
          &nbsp;&nbsp;
          <a
            class="change"
            href="#"
            name="email"
            style="display:inline-block;vertical-align:middle;height:30px;"
          >
            Изменить
          </a>
        </div>
        <div class="hide" id="email-editor">
          <input name="email" style="width: 280px;" type="email" />
        </div>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <span>Комментарий</span>
              </td>
            </tr>
            <tr>
              <td>
                <textarea
                  name="comment"
                  rows="5"
                  style="width: 278px;"
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="clear: both;">
        Нажимая на кнопку "Отправить заявку", я даю согласие на обработку моих
        персональных данных и принимаю условия
        <a href="/privacy_policy.pdf" target="_blank">
          политики конфиденциальности
        </a>
        .
      </div>
      <div style="clear: both; padding-top: 30px;">
        <center>
          <button class="btn btn-primary" type="submit">
            Отправить заявку
          </button>
        </center>
      </div>
    </fieldset>
  </form>
</div>
